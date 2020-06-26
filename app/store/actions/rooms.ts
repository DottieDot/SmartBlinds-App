import { Room } from '../model'
import { SET_ROOMS, SET_ROOM_STATE, SET_ROOM_NAME, REMOVE_ROOM, ADD_ROOM } from './names'
import { Dispatch } from 'redux'
import { RootState } from '..'
import { roomSelector } from '../selectors'
import * as api from '../../api'

export const setRoomState = (room: number, state: number) =>
  async (dispatch: Dispatch, getState: () => RootState) => {
    const prevState = roomSelector(room)(getState()).state

    dispatch({
      type: SET_ROOM_STATE,
      room,
      state,
    })

    const res = await api.SetRoomState(room, state)
    if (!res) {
      dispatch({
        type: SET_ROOM_STATE,
        room,
        state: prevState,
      })
    }
  }

export const setRoomName = (room: number, name: string) =>
  async (dispatch: Dispatch, getState: () => RootState) => {
    const prevName = roomSelector(room)(getState()).name

    dispatch({
      type: SET_ROOM_NAME,
      room,
      name,
    })

    const res = await api.SetRoomName(room, name)
    if (!res) {
      dispatch({
        type: SET_ROOM_NAME,
        room,
        name: prevName,
      })
    }
  }

export const setRooms = (rooms: { [key: number]: Room }) => ({
  type: SET_ROOMS,
  rooms,
})

export const removeRoom = (roomId: number) =>
  async (dispatch: Dispatch, getState: () => RootState) => {
    const room = roomSelector(roomId)(getState())

    const routineActions = Object.values(
      getState().routineActions
    ).filter(({ room_id }) => room_id === roomId)
      .map(({ id }) => id)

    const res = await api.DeleteRoom(roomId)
    if (res) {
      dispatch({
        type: REMOVE_ROOM,
        room, routineActions
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
