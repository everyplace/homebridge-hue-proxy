//import { rooms, room} from './rooms.js'
import { brightness } from './proxy.js'

const high = 200
const low = 10

test('setting the light high should work', async()=>{
  const result = await brightness(16, 'set', high)
  expect(result).toEqual(high)
})

test('light status should be returned high', async ()=>{
  const result = await brightness(16)
  expect(result).toEqual(high)
})

test('setting the light low should work', async()=>{
  const result = await brightness(16, 'set', low)
  expect(result).toEqual(low)
})

test('light status should be returned as low', async()=>{
  const result = await brightness(16)
  expect(result).toEqual(low)
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
