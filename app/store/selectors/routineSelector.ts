import { RootState } from '../index'

export default (routineId: number) => (
  (store: RootState) => store.routines[routineId]
)
