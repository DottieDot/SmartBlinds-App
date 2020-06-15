import { Room } from '../model'
import { SET_ROOMS, SET_ROOM_STATE, SET_ROOM_NAME, REMOVE_ROOMS, REMOVE_ROOM, ADD_ROOM } from '../reducers/rooms'
import { Dispatch } from 'redux'
import { RootState } from '..'
import { clearRoomFromSystems } from './systems'
import { roomSelector } from '../selectors'
import clearRoomFromHome from './clearRoomFromHome'
import * as api from '../../api'
import { SET_ROOM_FOR_SYSTEMS } from '../reducers/systems'
import sleep from '../../util/sleep'

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

export const removeRooms = (roomIds: number[]) => 
  (dispatch: Dispatch, getState: () => RootState) => {
    const rooms = getState().rooms
    const systemIds: number[] = []

    roomIds.forEach((roomId) => {
      const room = rooms[roomId]

      systemIds.push(...room.systems)
    })

    dispatch({
      type: REMOVE_ROOMS,
      rooms: roomIds,
    })
    dispatch(clearRoomFromSystems(systemIds))
  }

export const removeRoom = (roomId: number) => 
  async (dispatch: Dispatch, getState: () => RootState) => {
    const room = roomSelector(roomId)(getState())

    dispatch(clearRoomFromHome(room.home_id, room.id))
    dispatch(clearRoomFromSystems(room.systems))

    await sleep(0)
    dispatch({
      type: REMOVE_ROOM,
      room: roomId,
    })

    const res = await api.DeleteRoom(roomId)
    if (!res) {
      dispatch({
        type: ADD_ROOM,
        room
      })
      dispatch({
        type: SET_ROOM_FOR_SYSTEMS,
        systems: room.systems,
        room: room.id,
      })
    }
  }

export const createRoom = (name: string, home: number) =>
  async (dispatch: Dispatch) => {
    const id = await api.CreateRoom(name, home)
    if (id) {
      dispatch({
        type: ADD_ROOM,
        room: {
          id,
          home_id: home,
          name,
          state: 0,
          systems: []
        } as Room
      })
    }
    else {
      // :(
    }
  }
