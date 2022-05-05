import fetch from 'node-fetch'
import express from 'express'
import { resolve } from "path"
import { config } from "dotenv"
import { room } from './rooms.js'

import lights from './lights.js'

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

  const id = room(req.params.room).devices[0]
  const light = await brightness(id)
  return res.json(light)

})

router.get('/lights/:room/brightness/:id', async (req, res)=>{
  const { id } = req.params
  const light = await brightness(id)
  return res.json(light)
})

router.get('/lights/:room/brightness/modify/:method', async(req, res)=>{

  const ids = room(req.params.room).devices
  const responses = await Promise.all(ids.map(async(id)=>{
    return brightness(id, req.params.method)
  }))

  return res.json(responses)

})

router.get('/lights/:room/brightness/:id/:value', async(req, res)=>{

  const { id, value } = req.params

  /*
  const responses = await Promise.all(ids.map(async (id)=>{
    return await brightness(id, 'set', req.params.value)
  }))
  */

  const response = await brightness(id, 'set', value)
  return res.json(response)
})

export default router
