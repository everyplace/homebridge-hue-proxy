import lights from './lights.js'

const high = 200
const low = 10
const light = 15 //honeycomb sconce
const highHue = 8417 
const lowHue = 1000
const highSaturation = 140
const lowSaturation = 0

test('setting the light high should work', async()=>{
  const result = await lights.brightness(light, 'set', high)
  expect(result).toEqual(high)
})

test('light status should be returned high', async ()=>{
  const result = await lights.brightness(light)
  expect(result).toEqual(high)
})

test('setting the light low should work', async()=>{
  const result = await lights.brightness(light, 'set', low)
  expect(result).toEqual(low)
})

test('light status should be returned as low', async()=>{
  const result = await lights.brightness(light)
  expect(result).toEqual(low)
})


test('light should turn off', async()=>{
  const result = await lights.off(light)
  const expectedKey = `/lights/${light}/state/on`
  const resultValue = result[0].success[expectedKey]
  const expectedValue = false
  expect(resultValue).toEqual(expectedValue)
})

test('light should turn on', async()=>{
  const result = await lights.on(light)
  const expectedKey = `/lights/${light}/state/on`
  const resultValue = result[0].success[expectedKey]
  const expectedValue = true
  expect(resultValue).toEqual(expectedValue)
})

test('setting the light high should work', async()=>{
  const result = await lights.brightness(light, 'set', high)
  expect(result).toEqual(high)
})

test('light should return a color value', async()=>{
  const result = await lights.hue(light)
  expect(result).toEqual(highHue)
})

test(`light should be able to have its hue set to ${lowHue}`, async()=>{
  const result = await lights.hue(light, lowHue)
  expect(result).toEqual(lowHue)
})

test(`light should be able to have its hue reset to ${highHue}`, async()=>{
  const result = await lights.hue(light, highHue)
  expect(result).toEqual(highHue)
})

test('light should return a saturation value', async()=>{
  const result = await lights.saturation(light)
  expect(result).toEqual(140)
})

test('light should be able to have its saturation set to 0', async()=>{
  const result = await lights.saturation(light, 0)
  expect(result).toEqual(0)
})

test('light should be able to have its saturation reset to 140', async()=>{
  const result = await lights.saturation(light, 140)
  expect(result).toEqual(140)
})

/*
test('rooms should load correctly', () => {
  expect(rooms.length).toBeGreaterThan(0);
});


test('oficina should exist', () => {
  expect(rooms[0].name).toEqual('Oficina');
});

test(`requesting room('oficina') should work`, () => {
  expect(room('oficina').name).toEqual('Oficina');
});
*/
