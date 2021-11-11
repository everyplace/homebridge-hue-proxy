import fetch from 'node-fetch'
import express from 'express'
import { resolve } from "path"                                                                                                                         
import { config } from "dotenv"
import { room } from './rooms.js'

//load .env                                                                                                                                            
import { fileURLToPath } from 'url';                                                                                                                   
import { dirname } from 'path';                                                                                                                        
const __filename = fileURLToPath(import.meta.url);                                                                                                     
const __dirname = dirname(__filename);                                                                                                                 
config({ path: resolve(__dirname, ".env") })                                                                                                           
                                                                                                                                                       
const router = express.Router()
const { hue_address, hue_key } = process.env
const base = `http://${hue_address}/api/${hue_key}`

async function on(id) {
  const updateEndpoint = `${base}/lights/${id}/state`
  const body = { "on": true }

  return await fetch(updateEndpoint, {
    method: 'put',
    body: JSON.stringify(body)
  }).then(r=>r.json())
}

async function off(id) {
  const updateEndpoint = `${base}/lights/${id}/state`
  const body = { "on": false }

  return await fetch(updateEndpoint, {
    method: 'put',
    body: JSON.stringify(body)
  }).then(r=>r.json())
}

// await brightness(9) //get
// await brightness(9, increase) //increase by 35
async function brightness(id, method = undefined, value = undefined) {
  if(!id) throw new Error('Must specify an id as the first param')

  await on(id)
  
  const stepModifier = 35
  const endpoint = `${base}/lights/${id}`
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

    const updateEndpoint = `${base}/lights/${id}/state`
    const body = { "bri": brightness }

    await fetch(updateEndpoint, {
      method: 'put',
      body: JSON.stringify(body)
    }).then(r=>r.json())

  }
  
  return brightness
}

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

  const ids = room(req.params.room).devices
  return res.json(ids)

})

router.get('/lights/:room/brightness', async (req, res)=>{

  const id = room(req.params.room).devices.pop()
  const light = brightness(id)
  return res.json(light)
  
})

router.get('/lights/:room/brightness/modify/:method', async(req, res)=>{

  const ids = room(req.params.room).devices
  const responses = await Promise.all(ids.map(async(id)=>{
    brightness(id, req.params.method)
  }))

  return res.json(responses)

})

router.get('/lights/:room/brightness/:value', async(req, res)=>{

  const ids = room(req.params.room).devices
  const responses = await Promise.all(ids.map(async (id)=>{
    return await brightness(id, 'set', req.params.value)
  }))

  return res.json(responses)
})

export default router
