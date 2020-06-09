import { Room } from '../model'
import { SET_ROOMS, SET_ROOM_STATE, SET_ROOM_NAME } from '../reducers/rooms'

// TODO: Send API request
export const setRoomState = (room: number, state: number) => ({
  type: SET_ROOM_STATE,
  room,
  state,
})

// TODO: Send API request
export const setRoomName = (room: number, name: string) => ({
  type: SET_ROOM_NAME,
  room,
  name,
})

export const setRooms = (rooms: { [key: number]: Room }) => ({
  type: SET_ROOMS,
  rooms,
})
