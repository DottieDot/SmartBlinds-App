import { Room } from '../model'
import { SET_ROOMS, SET_ROOM_STATE } from '../reducers/rooms'

// TODO: Send API request
export const setRoomState = (room: number, state: number) => ({
  type: SET_ROOM_STATE,
  room,
  state,
})

export const setRooms = (rooms: { [key: number]: Room }) => ({
  type: SET_ROOMS,
  rooms,
})
