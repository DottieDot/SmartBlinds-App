import reducers from './reducers'
import { createStore, applyMiddleware, AnyAction } from 'redux'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { Auth, Home, Room, System } from './model'
import thunk, { ThunkDispatch } from 'redux-thunk'

export interface RootState {
  auth    :Auth,
  homes   :{ [key: number]: Home }
  rooms   :{ [key: number]: Room }
  systems :{ [key: number]: System }
}

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector

export type Dispatch = ThunkDispatch<RootState, void, AnyAction>

export default createStore(
  reducers,
  applyMiddleware(thunk)
)
