import { System } from '../model'
import { SET_SYSTEMS } from '../reducers/systems'
import { Dispatch } from 'redux'
import * as api from '../../api'

export const setSystems = (systems: { [key: number]: System }) => ({
  type    :SET_SYSTEMS,
  systems :systems,
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
