import { Dispatch } from 'redux'
import * as api from '../../api'
import { Routine, RoutineAction } from '../model'
import { SET_ROUTINES } from '../reducers/routines'

export const loadRoutines = () =>
  async (dispatch: Dispatch) => {
    const routines = await api.GetRoutines()

    const routinesReduced = routines?.reduce<{[key: number]: Routine}>((accumulator, routine) => (accumulator[routine.id] = {
      id        : routine.id,
      name      : routine.name,
      trigger_at: routine.trigger_at,
      actions   : routine.actions.map(({ id }: any) => id)
    }, accumulator), {})

    const actionsReduced = routines?.reduce<{[key: number]: RoutineAction}>((accumulator, routine) => 
      (routine.actions.forEach((action: any) => (accumulator[action.id] = {
        id        : action.id,
        routine_id: routine.id,
        state     : action.state,
        room_id   : action.room_id,
      })), accumulator),
    {})

    dispatch({
      type          : SET_ROUTINES,
      routines      : routinesReduced,
      routineActions: actionsReduced,
    })
  }
