import { Room } from '../model'

export const SET_ROOMS = 'SET_ROOMS'


export default (state: { [key: number]: Room } = {}, action: any) => {
  switch (action.type) {
    case SET_ROOMS:
      return action.rooms
    default:
      return state;
  }
}
