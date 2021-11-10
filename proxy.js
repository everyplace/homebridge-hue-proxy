import fetch from 'node-fetch'
import express from 'express'
import { resolve } from "path"                                                                                                                         
import { config } from "dotenv"

//load .env                                                                                                                                            
import { fileURLToPath } from 'url';                                                                                                                   
import { dirname } from 'path';                                                                                                                        
const __filename = fileURLToPath(import.meta.url);                                                                                                     
const __dirname = dirname(__filename);                                                                                                                 
config({ path: resolve(__dirname, ".env") })                                                                                                           
                                                                                                                                                       
const router = express.Router()
const { hue_address, hue_key } = process.env
const base = `http://${hue_address}/api/${hue_key}`

router.get('', (req, res)=>{

  res.end("lights")

})

router.get('/lights', async (req, res)=>{

  const endpoint = `${base}/lights`
  console.log(endpoint)
  const lights = await fetch(endpoint).then(r=>r.json())
  console.log(lights)
  return res.json(lights)
})

router.get('/lights/:room/', async(req, res)=>{

  const id = 9
  const endpoint = `${base}/lights/${id}`
  const light = await fetch(endpoint).then(r=>r.json())
  return res.json(light)

})

router.get('/lights/:room/brightness', async (req, res)=>{

  const id = 9
  const endpoint = `${base}/lights/${id}`
  const light = await fetch(endpoint).then(r=>r.json())
  return res.json(light.state.bri)

})

router.get('/lights/:room/brightness/:value', async(req, res)=>{

  const ids = [9,10]
  const responses = await Promise.all(ids.map(async (id)=>{

    const endpoint = `${base}/lights/${id}/state`
    const body = { "bri": parseInt(req.params.value) }

    const response = await fetch(endpoint, {
      method: 'put',
      body: JSON.stringify(body)
    }).then(r=>r.json())

    return response

  }))

  return res.json(responses)


})

export default router
