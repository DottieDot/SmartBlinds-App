import { Dispatch } from 'redux'
import { SET_HOMES, ADD_HOME } from '../reducers/homes'
import { Home } from '../model'
import * as api from '../../api'
import { Room } from '../model'
import { setRooms } from './rooms'

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
