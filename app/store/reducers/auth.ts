import { Auth, User } from "../model"

export const SET_LOGGED_IN  = 'AUTH:SET_LOGGED_IN'
export const SET_LOGGED_OUT = 'AUTH:SET_LOGGED_OUT'
export const SET_USER_DETAILS = 'AUTH:SET_USER_DETAILS'

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
    case SET_USER_DETAILS:
      return {
        ...state,
        user: {
          ...state.user,
          name: action.name,
          email: action.email,
        } as User
      }
    default:
      return state;
  }
}
