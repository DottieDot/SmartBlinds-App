import { System, Room } from '../model'
import { Dispatch } from 'redux'
import * as api from '../../api'
import { RootState } from '..'
import { systemSelector } from '../selectors'
import { SET_SYSTEMS, SET_SYSTEM_ROOM, SET_SYSTEM_NAME } from './names'

export const setSystems = (systems: { [key: number]: System }) => ({
  type    :SET_SYSTEMS,
  systems :systems,
})

export const setSystemRoom = (systemId: number, roomId: number) => 
  (dispatch: Dispatch, getState: () => RootState) => {
    const state = getState()
    const system = systemSelector(systemId)(getState())
    const newRoom = state.rooms[roomId]
    const prevRoom = system?.room_id ? state.rooms[system.room_id] : null

    dispatch({
      type   :SET_SYSTEM_ROOM,
      system :systemId,
      room   :newRoom.id,
      prevRoom: prevRoom?.id,
    })

    if (false) {
      dispatch({
        type    :SET_SYSTEM_ROOM,
        system  : systemId,
        room    : prevRoom?.id,
        prevRoom: newRoom.id,
      })
    }
  }

export const loadSystems = () => {
  return async (dispatch: Dispatch) => {
    const systems = await api.GetSystems()

    const systemsReduced = systems?.reduce<{ [key: number]: System }>((accumulator, system) => (
      accumulator[system.id] = system, 
      accumulator
    ), {})

    if (systemsReduced) {
      dispatch(setSystems(systemsReduced))
    }
    else {
      // Something went wrong.
    }
  }
} 

export const setSystemName = (system: number, name: string) => 
  async (dispatch: Dispatch, getState: () => RootState) => {
    const prevName = systemSelector(system)(getState())

    dispatch({
      type: SET_SYSTEM_NAME,
      system, name,
    })
  }
