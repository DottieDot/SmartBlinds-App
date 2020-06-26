import { RoutineAction } from '../model'
import { SET_ROUTINES, REMOVE_ROUTINE, REMOVE_ROOM, REMOVE_HOME } from '../actions/names'

export default (state: { [key: number]: RoutineAction } = {}, action: any) => {
  switch (action.type) {
    case SET_ROUTINES:
      return {
        ...action.routineActions
      }
    case REMOVE_ROUTINE:
      return Object.keys(state).reduce<typeof state>((accumulator, _key) => {
        const key = +_key
        if (!action.routine.actions.includes(key)) {
          accumulator[key] = state[key]
        }
        return accumulator
      }, {})
    case REMOVE_ROOM:
      return Object.keys(state).reduce<typeof state>((accumulator, _key) => {
        const key = +_key
        if (action.room.id !== state[key].room_id) {
          accumulator[key] = state[key]
        }
        return accumulator
      }, {})
    case REMOVE_HOME:
      return Object.keys(state).reduce<typeof state>((accumulator, _key) => {
        const key = +_key
        if (!action.home.rooms.includes(state[key].room_id)) {
          accumulator[key] = state[key]
        }
        return accumulator
      }, {}) 
    default:
      return state
  }
}
