const rooms = [
  {
    name: 'Oficina',
    devices: [9,10]
  }
]

function room(name) {
  return rooms.filter(room=>room.name.toLowercasse()===name.toLowercase()).pop()
}

export {rooms, room}