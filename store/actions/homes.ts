import { Dispatch } from "redux"
import OAuth2 from "../../util/OAuth2"
import { SET_HOMES } from "../reducers/homes"
import { Home } from "../model"
import * as api from '../../api'
import { Room } from "../model"
import { setRooms } from "./rooms"

export const setHomes = (homes: { [key: number]: Home }) => ({
  type: SET_HOMES,
  homes,
})


export const loadHomes = () => {
  return async (dispatch: Dispatch) => {
    const homes = await api.GetHomes()

    const homesReduced = homes?.reduce<{ [key: number]: Home }>(
      (accumulator, item) => 
        (accumulator[item.id] = {
          id: item.id,
          name: item.name,
          rooms: item.rooms.map(({ id }: any) => id)
        }, accumulator),
      {}
    )

    const roomsReduced = homes?.reduce<{ [key: number]: Room }>(
      (accumulator, home) => 
        (home.rooms.forEach(
          (room: any) => (accumulator[room.id] = {
            id: room.id,
            homeId: home.id,
            name: room.name,
            state: room.state,
          })
        ), accumulator),
      {}
    )

    if (homesReduced) {
      dispatch(setHomes(homesReduced))
      dispatch(setRooms(roomsReduced))
    }
    else {
      // Something went wrong.
    }
  }
}
