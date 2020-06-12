import { CLEAR_ROOM_FROM_HOME } from "../reducers/homes";

// Require cycle :)
export default (home: number, room: number) =>({
  type: CLEAR_ROOM_FROM_HOME,
  home, room,
})
