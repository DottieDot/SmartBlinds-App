import { Room } from '../model'

export const SET_ROOMS = 'SET_ROOMS'
export const SET_ROOM_STATE = 'SET_ROOM_STATE'
export const SET_ROOM_NAME = 'SET_ROOM_NAME'

export default (state: { [key: number]: Room } = {}, action: any) => {
  switch (action.type) {
    case SET_ROOMS:
      return action.rooms
    case SET_ROOM_NAME:
      return {
        ...state,
        [action.room]: {
          ...state[action.room],
          name: action.name,
        },
      }
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
