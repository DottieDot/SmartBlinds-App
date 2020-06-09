import { Room } from '../model'

export const SET_ROOMS = 'SET_ROOMS'
export const SET_ROOM_STATE = 'SET_ROOM_STATE'


export default (state: { [key: number]: Room } = {}, action: any) => {
  switch (action.type) {
    case SET_ROOMS:
      return action.rooms
    case SET_ROOM_STATE:
      return {
        ...state,
        [action.room]: {
          ...state[action.room],
          state: action.state,
        },
      }
    default:
      return state;
  }
}
