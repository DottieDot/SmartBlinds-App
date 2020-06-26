import { Dispatch } from 'redux'
import * as api from '../../api'
import { Routine, RoutineAction } from '../model'
import { SET_ROUTINES, SET_ROUTINE_NAME, SET_ROUTINE_TRIGGER, SET_ROUTINE_DAYS, REMOVE_ROUTINE, ADD_ROUTINE } from './names'
import { RootState } from '..'
import { routineSelector } from '../selectors'

export const loadRoutines = () =>
  async (dispatch: Dispatch) => {
    const routines = await api.GetRoutines()

    const routinesReduced = routines?.reduce<{[key: number]: Routine}>((accumulator, routine) => (accumulator[routine.id] = {
      id        : routine.id,
      name      : routine.name,
      trigger_at: routine.trigger_at,
      days      : routine.days,
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

export const setRoutineName = (routine: number, name: string, commit: boolean, origName: string = '') =>
  async (dispatch: Dispatch, getState: () => RootState) => {
    dispatch({
      type: SET_ROUTINE_NAME,
      routine, name
    })
    
    if (commit) {
      const res = await api.SetRoutineName(routine, name)
      if (!res) {
        dispatch({
          type: SET_ROUTINE_NAME,
          routine,
          name: origName,
        })
      }
    }
  }

export const setRoutineTrigger = (routine: number, triggerAt: string) =>
  async (dispatch: Dispatch, getState: () => RootState) => {
    const origTrigger = routineSelector(routine)(getState()).trigger_at

    dispatch({
      type: SET_ROUTINE_TRIGGER,
      routine, triggerAt
    })
    
    const res = await api.SetRoutineTrigger(routine, triggerAt)
    if (!res) {
      dispatch({
        type: SET_ROUTINE_TRIGGER,
        routine, 
        triggetAt: origTrigger,
      })
    }
  }

export const setRoutineDays = (routine: number, days: number) =>
  async (dispatch: Dispatch, getState: () => RootState) => {
    const origDays = routineSelector(routine)(getState()).days

    dispatch({
      type: SET_ROUTINE_DAYS,
      routine, days,
    })

    const res = await api.SetRoutineDays(routine, days)
    if (!res) {
      dispatch({
        type: SET_ROUTINE_DAYS,
        routine,
        days: origDays,
      })
    }
  }

export const removeRoutine = (routineId: number) =>
  async (dispatch: Dispatch, getState: () => RootState) => {
    const routine = routineSelector(routineId)(getState())

    const res = await api.DeleteRoutine(routineId)
    if (res) {
      dispatch({
        type: REMOVE_ROUTINE,
        routine
      })
    }
  }

export const addRoutine = (name: string) =>
  async (dispatch: Dispatch) => {
    const id = await api.CreateRoutine(name)
    if (id !== null) {
      dispatch({
        type: ADD_ROUTINE,
        routine: {
          id,
          name,
          trigger_at: '00:00:00',
          days: 0,
          actions: [],
        } as Routine
      })
    }
  }
