import { System, Room } from '../model'
import { SET_SYSTEMS, SET_SYSTEM_ROOM } from '../reducers/systems'
import { Dispatch } from 'redux'
import * as api from '../../api'
import { SET_ROOM_SYSTEMS } from '../reducers/rooms'
import { RootState } from '..'

export const setSystems = (systems: { [key: number]: System }) => ({
  type    :SET_SYSTEMS,
  systems :systems,
})

export const setSystemRoom = (systemId: number, roomId: number) => 
  (dispatch: Dispatch, getState: () => RootState) => {
    const state = getState()
    const system = state.systems[systemId]
    const newRoom = state.rooms[roomId]
    const prevRoom = state.rooms[system.room_id]

    dispatch({
      type   :SET_SYSTEM_ROOM,
      system :systemId,
      room   :newRoom.id
    })
    dispatch({
      type    :SET_ROOM_SYSTEMS,
      room    :prevRoom.id,
      systems :prevRoom.systems.filter(sys => sys !== systemId)
    })
    dispatch({
      type    :SET_ROOM_SYSTEMS,
      room    :newRoom.id,
      systems :[...newRoom.systems, systemId]
    })
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
