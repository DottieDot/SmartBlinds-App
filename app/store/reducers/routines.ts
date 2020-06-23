import { Routine } from '../model'

export const SET_ROUTINES = 'ROUTINES:SET_ROUTINES'

export default (state: { [key: number]: Routine } = {}, action: any) => {
  switch (action.type) {
    case SET_ROUTINES:
      return {
        ...action.routines
      }
    default:
      return state
  }
}
