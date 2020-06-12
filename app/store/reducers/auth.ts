import { Auth } from "../model"

export const SET_LOGGED_IN  = 'AUTH:SET_LOGGED_IN'
export const SET_LOGGED_OUT = 'AUTH:SET_LOGGED_OUT'

const initialState: Auth = {
  loggedIn: false,
  user: null,
}

export default (state = initialState, action: any): Auth => {
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
