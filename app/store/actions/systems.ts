import { System, Room } from '../model'
import { SET_SYSTEMS, SET_SYSTEM_ROOM, CLEAR_ROOM_FROM_SYSTEMS, SET_SYSTEM_NAME } from '../reducers/systems'
import { Dispatch } from 'redux'
import * as api from '../../api'
import { SET_ROOM_SYSTEMS } from '../reducers/rooms'
import { RootState } from '..'
import { systemSelector } from '../selectors'

export const setSystems = (systems: { [key: number]: System }) => ({
  type    :SET_SYSTEMS,
  systems :systems,
})

export const setSystemRoom = (systemId: number, roomId: number) => 
  (dispatch: Dispatch, getState: () => RootState) => {
    const state = getState()
    const system = state.systems[systemId]
    const newRoom = state.rooms[roomId]
    const prevRoom = state.rooms[system.room_id ?? -1]

    dispatch({
      type   :SET_SYSTEM_ROOM,
      system :systemId,
      room   :newRoom.id
    })
    if (system.room_id !== null) {
      dispatch({
        type    :SET_ROOM_SYSTEMS,
        room    :prevRoom.id,
        systems :prevRoom.systems.filter(sys => sys !== systemId)
      })
    }
    dispatch({
      type    :SET_ROOM_SYSTEMS,
      room    :newRoom.id,
      systems :[...newRoom.systems, systemId]
    })
  }

export const clearRoomFromSystems = (systems: number[]) => ({
  type: CLEAR_ROOM_FROM_SYSTEMS,
  systems: systems,
})

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
