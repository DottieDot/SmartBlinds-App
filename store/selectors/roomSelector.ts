import { RootState } from '../index'

export default (roomId: number) => (
  (store: RootState) => store.rooms[roomId]
)
