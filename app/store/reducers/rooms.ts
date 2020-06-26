import { Room } from '../model'
import { SET_ROOMS, SET_ROOM_NAME, SET_ROOM_STATE, REMOVE_ROOM, ADD_ROOM, SET_SYSTEM_ROOM, REMOVE_HOME } from '../actions/names'

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
    case SET_SYSTEM_ROOM:
      return Object.keys(state).reduce<typeof state>((accumulator, _key) => {
        const key = +_key
        if (key === action.prevRoom) {
          accumulator[key] = {
            ...state[key],
            systems: state[key].systems.filter(id => id !== action.system),
          }
        }
        else if (key === action.room) {
          accumulator[key] = {
            ...state[key],
            systems: [...state[key].systems, action.system]
          }
        }
        else {
          accumulator[key] = state[key]
        }
        return accumulator
      }, {})
    case REMOVE_ROOM:
      return Object.keys(state).reduce<typeof state>((accumulator, _key) => {
        const key = +_key
        if (key !== action.room.id) {
          accumulator[key] = state[key]
        }
        return accumulator
      }, {})
    case REMOVE_HOME:
      return Object.keys(state).reduce<typeof state>((accumulator, _key) => {
        const key = +_key
        if (!action.home.rooms.includes(key)) {
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
