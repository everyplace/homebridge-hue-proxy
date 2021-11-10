import fetch from 'node-fetch'
import express from 'express'
const router = express.Router()

const { hue_address, hue_key } = process.env
const endpoint = `http://${hue_address}/api/${hue_key}`

router.get('', (res, req)=>{

  res.end("lights")

})

router.get('/lights', async (req, res)=>{
  const lights = await fetch(`${endpoint}/lights`)
  res.json(lights)
})

export default router