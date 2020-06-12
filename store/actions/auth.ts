import { User } from '../model'
import { SET_LOGGED_IN, SET_LOGGED_OUT } from '../reducers/auth'
import { loadHomes } from './homes'
import { Dispatch } from '..'
import { loadSystems } from './systems'

export const SetLoggedIn = (user: User) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: SET_LOGGED_IN,
      user,
    })

    dispatch(loadSystems())
    dispatch(loadHomes())
  }
}

export const SetLoggedOut = () => ({
    type: SET_LOGGED_OUT,
})
