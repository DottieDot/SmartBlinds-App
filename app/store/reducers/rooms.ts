import { Room } from '../model'

export const SET_ROOMS        = 'ROOMS:SET_ROOMS'
export const SET_ROOM_STATE   = 'ROOMS:SET_ROOM_STATE'
export const SET_ROOM_NAME    = 'ROOMS:SET_ROOM_NAME'
export const SET_ROOM_SYSTEMS = 'ROOMS:SET_ROOM_SYSTEMS'
export const REMOVE_ROOMS     = 'ROOMS:REMOVE_ROOMS'
export const REMOVE_ROOM      = 'ROOMS:REMOVE_ROOM'
export const ADD_ROOM         = 'ROOMS:ADD_ROOM'

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
    case SET_ROOM_SYSTEMS:
      return {
        ...state,
        [action.room]: {
          ...state[action.room],
          systems: action.systems,
        }
      }
    case REMOVE_ROOM:
      return Object.keys(state).reduce<typeof state>((accumulator, _key) => {
        const key = +_key
        if (key !== action.room) {
          accumulator[key] = state[key]
        }
        return accumulator
      }, {})
    case REMOVE_ROOMS:
      return Object.keys(state).reduce<typeof state>((accumulator, _key) => {
        const key = +_key
        if (!action.rooms.includes(key)) {
          accumulator[key] = state[key]
        }
        return accumulator
      }, {})
    case ADD_ROOM:
      return {
        ...state,
        [action.room.id]: {
          ...action.room
        }
      }
    default:
      return state;
  }
}
