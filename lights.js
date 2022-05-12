import fetch from 'node-fetch'
import { resolve } from "path"
import { config } from "dotenv"

//load .env
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
config({ path: resolve(__dirname, ".env") })

const { hue_address, hue_key } = process.env

class Lights {

  constructor(hue_address, hue_key){
    this.hue_address = hue_address
    this.hue_key = hue_key
    this.base = `http://${hue_address}/api/${hue_key}`

    this.stepModifier = 35
  }

  async on(id) {
    return await this.updateLight(id, { "on": true })
  }

  async off(id) {
    return await this.updateLight(id, { "on": false })
  }


  // await brightness(9) //get
  // await brightness(9, increase) //increase by 35  
  async brightness(id, method = undefined, value = undefined) {
    let bri = await this.attribute(id, 'bri')

    if(method === undefined && value === undefined) return bri

    if(['increase','decrease'].includes(method)) {
      bri = method === 'increase' 
        ? bri + this.stepModifier
        : bri - this.stepModifier
      // make sure brightness is between 1 and 254
      bri = bri > 254 ? 254 : bri < 1 ? 1 : bri
    } else if (value !== undefined) {
      bri = value
    }

    return await this.attribute(id, 'bri', bri)

  }
  
  async hue (id, value = undefined) {

    return await this.attribute(id, 'hue', value)

  }

  async saturation (id, value = undefined) {
  
    return await this.attribute(id, 'sat', value)

  }

  async attribute (id, attr, value = undefined) {
    id = parseInt(id)
    if(!id) throw new Error('Must specify an id as the first param')

    await this.on(id)
    const endpoint = `${this.base}/lights/${id}`
    const light = await fetch(endpoint).then(r=>r.json())

    let attrValue = light.state[attr]

    if(value !== undefined) {
      const updateEndpoint = `${this.base}/lights/${id}/state`
      const body = {}
      body[attr] = value

      const response = await this.updateLight(id, body)
      attrValue = response[0].success[`/lights/${id}/state/${attr}`]
    }

    return attrValue

  }

  async updateLight (id, body) {
    const updateEndpoint = this.endpoint(id)
    return await fetch(updateEndpoint, {
      method: 'put',
      body: JSON.stringify(body)
    }).then(r=>r.json())
  }

  endpoint(id) {
    return `${this.base}/lights/${id}/state`
  }

}

const lights = new Lights(hue_address, hue_key)

export default lights

export { Lights }
