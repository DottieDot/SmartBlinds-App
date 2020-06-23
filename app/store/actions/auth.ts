import { User } from '../model'
import { SET_LOGGED_IN, SET_LOGGED_OUT, SET_USER_DETAILS } from '../reducers/auth'
import { loadHomes } from './homes'
import { Dispatch, RootState } from '..'
import { loadSystems } from './systems'
import * as api from '../../api'
import { loadRoutines } from './routines'

export const SetLoggedIn = (user: User) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: SET_LOGGED_IN,
      user,
    })

    dispatch(loadSystems())
    dispatch(loadHomes())
    dispatch(loadRoutines())
  }
}

export const SetLoggedOut = () => ({
    type: SET_LOGGED_OUT,
})

export const SetDetails = (name: string, email: string) => 
  async (dispatch: Dispatch, getState: () => RootState) => {
    const prevData = getState().auth.user

    // Shouldn't be possible
    if (!prevData) {
      return
    }

    dispatch({
      type: SET_USER_DETAILS,
      name, email,
    })

    const res = await api.ChangeDetails(name, email)
    if (!res) {
      dispatch({
        type: SET_USER_DETAILS,
        name: prevData.name,
        email: prevData.email,
      })
    }
  }
