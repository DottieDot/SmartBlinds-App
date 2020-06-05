import { IAuth } from "../model"

export const SET_LOGGED_IN = 'SET_LOGGED_IN'
export const SET_LOGGED_OUT = 'SET_LOGGED_OUT'

const initialState: IAuth = {
  loggedIn: false,
  user: null,
}

export default (state = initialState, action: any): IAuth => {
  switch (action.type) {
    case SET_LOGGED_IN:
      return {
        loggedIn: true,
        user: action.user,
      }
    case SET_LOGGED_OUT:
      return {
        loggedIn: false,
        user: null,
      }
    default:
      return state;
  }
}
