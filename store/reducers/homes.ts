import { Home } from '../model'

export const SET_HOMES     = 'HOMES:SET_HOMES'
export const ADD_HOME      = 'HOMES:ADD_HOME'
export const REMOVE_HOME   = 'HOMES:REMOVE_HOME'
export const SET_HOME_NAME = 'HOMES:SET_HOME_NAME'

export default (state: { [key: number]: Home } = {}, action: any) => {
  switch (action.type) {
    case SET_HOMES:
      return action.homes
    case ADD_HOME:
      return {
        ...state,
        [action.home.id]: action.home,
      }
    case REMOVE_HOME:
      return Object.keys(state).reduce<typeof state>((object, key: string) => {
        if (key != action.home) {
          object[+key] = state[+key]
        }
        return object
      }, {})
    case SET_HOME_NAME:
      return {
        ...state,
        [action.home]: {
          ...state[action.home],
          name: action.name,
        },
      }
    default:
      return state;
  }
}
