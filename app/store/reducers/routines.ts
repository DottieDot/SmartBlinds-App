import { Routine } from '../model'
import { SET_ROUTINES, SET_ROUTINE_NAME, SET_ROUTINE_DAYS, REMOVE_ROUTINE, REMOVE_HOME, REMOVE_ROOM, ADD_ROUTINE } from '../actions/names'

export default (state: { [key: number]: Routine } = {}, action: any) => {
  switch (action.type) {
    case SET_ROUTINES:
      return {
        ...action.routines
      }
    case SET_ROUTINE_NAME: {
      return {
        ...state,
        [action.routine]: {
          ...state[action.routine],
          name: action.name,
        }
      }
    }
    case SET_ROUTINE_DAYS:
      return {
        ...state,
        [action.routine]: {
          ...state[action.routine],
          days: action.days,
        }
      }
    case REMOVE_ROUTINE:
      return Object.keys(state).reduce<typeof state>((accumulator, _key) => {
        const key = +_key
        if (key !== action.routine.id) {
          accumulator[key] = state[key]
        }
        return accumulator
      }, {})
    case ADD_ROUTINE:
      return {
        ...state,
        [action.routine.id]: {
          ...action.routine,
        }
      }
    case REMOVE_HOME:
    case REMOVE_ROOM:
      return Object.keys(state).reduce<typeof state>((accumulator, _key) => {
        const key = +_key

        accumulator[key] = state[key]
        action.routineActions.forEach((id: number) => {
          if (state[key].actions.includes(id)) {
            accumulator[key] = {
              ...accumulator[key],
              actions: accumulator[key].actions.filter(v => v !== id)
            }
          }
        })

        return accumulator
      }, {})
    default:
      return state
  }
}
