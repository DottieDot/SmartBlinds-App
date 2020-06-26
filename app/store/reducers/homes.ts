import { Home } from '../model'
import { SET_HOMES, ADD_HOME, REMOVE_HOME, SET_HOME_NAME, ADD_ROOM, REMOVE_ROOM } from '../actions/names'

export default (state: { [key: number]: Home } = {}, action: any) => {
  switch (action.type) {
    case SET_HOMES:
      return action.homes
    case ADD_HOME:
      return {
        ...state,
        [action.home.id]: action.home,
      }
    case REMOVE_HOME:
      return Object.keys(state).reduce<typeof state>((object, key: string) => {
        if (key != action.home) {
          object[+key] = state[+key]
        }
        return object
      }, {})
    case SET_HOME_NAME:
      return {
        ...state,
        [action.home]: {
          ...state[action.home],
          name: action.name,
        },
      }
    case ADD_ROOM:
      return {
        ...state,
        [action.room.home_id]: {
          ...state[action.room.home_id],
          rooms: [ ...state[action.room.home_id].rooms, action.room.id ]
        }
      }
    case REMOVE_ROOM:
      return {
        ...state,
        [action.room.home_id]: {
          ...state[action.room.home_id],
          rooms: [ state[action.room.home_id].rooms.filter(v => v !== action.room.id) ]
        }
      }
    default:
      return state;
  }
}
