import v3 from 'node-hue-api'
import { Router } from 'express'

console.log(v3)
const router = Router()

const LightState = v3.lightStates.LightState;

const USERNAME = process.env.hue_key
  // The name of the light we wish to retrieve by name
  , LIGHT_ID = 16
;

router.get('/', async(req, res)=>{

    const host = hue.lan;
    const api = await v3.api.createLocal(host).connect(USERNAME);

    // Using a LightState object to build the desired state
    const state = new LightState()
      .on()
      .ct(200)
      .brightness(10)
    ;

    const result = await api.lights.setLightState(LIGHT_ID, state)
    return res.json({result})
})

export default router
