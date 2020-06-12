import { Dispatch } from 'redux'
import { SET_HOMES, ADD_HOME, REMOVE_HOME, SET_HOME_NAME } from '../reducers/homes'
import { Home } from '../model'
import * as api from '../../api'
import { Room } from '../model'
import { setRooms } from './rooms'
import { RootState } from '..'
import { homeSelector } from '../selectors'

export const setHomes = (homes: { [key: number]: Home }) => ({
  type: SET_HOMES,
  homes,
})

export const addHome = (name: string) => 
  async (dispatch: Dispatch) => {
    const homeId = await api.AddHome(name)

    if (homeId !== null) {
      dispatch({
        type: ADD_HOME,
        home: {
          id: homeId,
          name: name,
          rooms: [],
        }
      })
    }
    else {

    }
  }

export const removeHome = (home: number) =>
  async (dispatch: Dispatch, getState: () => RootState) => {
    const homeData = homeSelector(home)(getState())

    dispatch({
      type: REMOVE_HOME,
      home,
    })

    const result = await api.DeleteHome(home)
    if (!result) {
      dispatch({
        type: ADD_HOME,
        home: homeData
      })
    }
  }

export const setHomeName = (home: number, name: string) => 
  async (dispatch: Dispatch, getState: () => RootState) => {
    const oldName = homeSelector(home)(getState()).name

    dispatch({
      type: SET_HOME_NAME,
      home, name,
    })

    const success = await api.SetHomeName(home, name)
    if (!success) {
      dispatch({
        type: SET_HOME_NAME,
        name: oldName,
        home,
      })
    }
  }

export const loadHomes = () => {
  return async (dispatch: Dispatch) => {
    const homes = await api.GetHomes()

    const homesReduced = homes?.reduce<{ [key: number]: Home }>(
      (accumulator, item) => 
        (accumulator[item.id] = {
          id    :item.id,
          name  :item.name,
          rooms :item.rooms.map(({ id }: any) => id)
        }, accumulator),
      {}
    )

    const roomsReduced = homes?.reduce<{ [key: number]: Room }>(
      (accumulator, home) => 
        (home.rooms.forEach(
          (room: any) => (accumulator[room.id] = {
            id      :room.id,
            home_id :home.id,
            name    :room.name,
            state   :room.state,
            systems :room.systems,
          })
        ), accumulator),
      {}
    )

    if (homesReduced && roomsReduced) {
      dispatch(setRooms(roomsReduced))
      dispatch(setHomes(homesReduced))
    }
    else {
      // Something went wrong.
    }
  }
}
