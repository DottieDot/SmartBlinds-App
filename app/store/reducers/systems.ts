import { System } from '../model'
import { SET_SYSTEMS, SET_SYSTEM_ROOM, SET_SYSTEM_NAME, ADD_ROOM, REMOVE_ROOM, REMOVE_HOME } from '../actions/names'

export default (state: { [key: number]: System } = {}, action: any) => {
  switch (action.type) {
    case SET_SYSTEMS:
      return action.systems
    case SET_SYSTEM_ROOM:
      return {
        ...state,
        [action.system]: {
          ...state[action.system],
          room_id: action.room,
        }
      }
    case SET_SYSTEM_NAME:
      return {
        ...state,
        [action.system]: {
          ...state[action.system],
          name: action.name,
        }
      }
    case ADD_ROOM:
      return Object.keys(state).reduce<typeof state>((accumulator, _key) => {
        const key = +_key
        if (action.room.systems.includes(key)) {
          accumulator[key] = { 
            ...state[key],
            room_id: action.room.id
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
        if (action.room.systems.includes(key)) {
          accumulator[key] = { 
            ...state[key],
            room_id: null
          }
        }
        else {
          accumulator[key] = state[key]
        }
        return accumulator
      }, {})
    case REMOVE_HOME: 
      return Object.keys(state).reduce<typeof state>((accumulator, _key) => {
        const key = +_key
        if (action.home.rooms.includes(state[key].room_id)) {
          accumulator[key] = { 
            ...state[key],
            room_id: null
          }
        }
        else {
          accumulator[key] = state[key]
        }
        return accumulator
      }, {})
    default:
      return state;
  }
}
