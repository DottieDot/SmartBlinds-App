import { Auth, User } from "../model"
import { SET_LOGGED_IN, SET_LOGGED_OUT, SET_USER_DETAILS } from "../actions/names"

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
