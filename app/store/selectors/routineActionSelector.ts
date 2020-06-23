import { RootState } from '../index'

export default (routineActionId: number) => (
  (store: RootState) => store.routineActions[routineActionId]
)
