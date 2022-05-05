import lights from './lights.js'

const high = 200
const low = 10
const light = 16 //cama grande light

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
