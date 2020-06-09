import { Home } from '../model'

export const SET_HOMES = 'SET_HOMES'

export default (state: { [key: number]: Home } = {}, action: any) => {
  switch (action.type) {
    case SET_HOMES:
      return action.homes
    default:
      return state;
  }
}
