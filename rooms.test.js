import { rooms, room} from './rooms.js'

test('rooms should load correctly', () => {
  expect(rooms.length).toBeGreaterThan(0);
});


test('oficina should exist', () => {
  expect(rooms[0].name).toEqual('Oficina');
});

test(`requesting room('oficina') should work`, () => {
  expect(room('oficina').name).toEqual('Oficina');
});