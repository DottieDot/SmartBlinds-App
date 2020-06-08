import { Dispatch } from "redux"
import OAuth2 from "../../util/OAuth2"
import { SET_HOMES } from "../reducers/homes"
import { Home } from "../model"
import * as api from '../../api'

export const setHomes = (homes: Home[]) => ({
  type: SET_HOMES,
  homes,
})

export const loadHomes = () => {
  return async (dispatch: Dispatch) => {
    const homes = await api.GetHomes()

    if (homes) {
      dispatch(setHomes(homes))
    }
    else {
      // Something went wrong.
    }
  }
}
