import { System } from '../model'

export const SET_SYSTEMS = 'SET_SYSTEMS'

export default (state: { [key: number]: System } = {}, action: any) => {
  switch (action.type) {
    case SET_SYSTEMS:
      return action.systems
    default:
      return state;
  }
}
