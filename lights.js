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
    if(!id) throw new Error('Must specify an id as the first param')

    await this.on(id)

    const stepModifier = 35
    const endpoint = `${this.base}/lights/${id}`
    const light = await fetch(endpoint).then(r=>r.json())

    let brightness = parseInt(light.state.bri)

    if(method !== undefined) {

      if(method === 'increase') {
        const modified = brightness + stepModifier
        brightness = modified > 254 ? 254 : modified
      } else if (method === 'decrease') {
        const modified = brightness - stepModifier
        brightness = modified < 0 ? 0 : modified
      } else if (method === 'set') {
        brightness = value
      } else {
        throw new Error('Invalid method type. Current valid methods: increase, decrease')
      }

      const updateEndpoint = `${this.base}/lights/${id}/state`
      const body = { "bri": brightness }

      const hueResponse = this.updateLight(id, body)

      console.log({updateEndpoint, body, hueResponse:hueResponse[0]})

    }

    return brightness
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
