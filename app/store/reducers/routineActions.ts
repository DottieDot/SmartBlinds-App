import { Routine } from '../model'
import { SET_ROUTINES } from './routines'

export default (state: { [key: number]: Routine } = {}, action: any) => {
  switch (action.type) {
    case SET_ROUTINES:
      return {
        ...action.routineActions
      }
    default:
      return state
  }
}
