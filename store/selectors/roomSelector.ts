import { RootState } from '../index'

export default (roomId: number, homeId: number) => (
  (store: RootState) => (
    store.homes.find(({ id }) => id === homeId)
      ?.rooms.find(({ id }) => id === roomId)
  )
)
