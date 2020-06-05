import { IUser } from "../model";
import { SET_LOGGED_IN, SET_LOGGED_OUT } from "../reducers/auth";

export const SetLoggedIn = (user: IUser) => ({ 
  type: SET_LOGGED_IN,
  user,
})

export const SetLoggedOut = () => ({
    type: SET_LOGGED_OUT,
})
