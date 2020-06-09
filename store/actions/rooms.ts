import { Room } from '../model'
import { SET_ROOMS } from '../reducers/rooms'

export const setRooms = (rooms: { [key: number]: Room }) => ({
  type: SET_ROOMS,
  rooms,
})
