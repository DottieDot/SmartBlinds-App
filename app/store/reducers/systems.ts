import { System } from '../model'

export const SET_SYSTEMS             = 'SYSTEMS:SET_SYSTEMS'
export const SET_SYSTEM_ROOM         = 'SYSTEMS:SET_SYSTEM_ROOM'
export const CLEAR_ROOM_FROM_SYSTEMS = 'SYSTEMS:CLEAR_ROOM_FROM_SYSTEMS'
export const SET_ROOM_FOR_SYSTEMS    = 'SYSTEMS:SET_ROOM_FOR_SYSTEMS'

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
    case CLEAR_ROOM_FROM_SYSTEMS:
      return Object.keys(state).reduce<typeof state>((accumulator, _key) => {
        const key = +_key
        accumulator[key] = {
          ...state[key],
          room_id: action.systems.includes(key) ? null : state[key].room_id
        }
        return accumulator
      }, {})
    case SET_ROOM_FOR_SYSTEMS:
      return Object.keys(state).reduce<typeof state>((accumulator, _key) => {
        const key = +_key
        accumulator[key] = {
          ...state[key],
          room_id: action.systems.includes(key) ? action.room : state[key].room_id
        }
        return accumulator
      }, {})
    default:
      return state;
  }
}
