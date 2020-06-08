import { Home } from '../model'

export const ADD_HOME = 'ADD_HOME'
export const SET_HOMES = 'SET_HOMES'

export default (state: Home[] = [], action: any) => {
  switch (action.type) {
    case 'ADD_HOME':
      return [
        ...state,
        action.home
      ]
    case 'SET_HOMES':
      return [
        action.homes
      ]
    default:
      return state;
  }
}
