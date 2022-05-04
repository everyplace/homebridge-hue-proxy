const rooms = [
  {
    name: 'Oficina',
    devices: [9,10]
  },
  {
    name: 'Cama Grande',
    devices: [16]
  }
]

function room(name) {
  return rooms.filter((room)=>{

    console.log(room.name.toLowerCase())
    return room.name.toLowerCase()===name.toLowerCase()
  }).pop()
}

export {rooms, room}
