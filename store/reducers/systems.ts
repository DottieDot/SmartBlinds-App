import { System } from '../model'

export const SET_SYSTEMS     = 'SET_SYSTEMS'
export const SET_SYSTEM_ROOM = 'SET_SYSTEM_ROOM'

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
    default:
      return state;
  }
}
