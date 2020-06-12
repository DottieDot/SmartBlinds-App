import { Home } from '../model'

export const SET_HOMES = 'SET_HOMES'
export const ADD_HOME = 'ADD_HOME'

export default (state: { [key: number]: Home } = {}, action: any) => {
  switch (action.type) {
    case SET_HOMES:
      return action.homes
    case ADD_HOME:
      return {
        ...state,
        [action.home.id]: action.home,
      }
    default:
      return state;
  }
}
