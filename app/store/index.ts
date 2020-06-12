import reducers from './reducers'
import { createStore, applyMiddleware, AnyAction } from 'redux'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { Auth, Home, Room, System, Settings } from './model'
import thunk, { ThunkDispatch } from 'redux-thunk'
import { persistStore } from 'redux-persist'

export interface RootState {
  auth     :Auth,
  settings :Settings,
  homes    :{ [key: number]: Home }
  rooms    :{ [key: number]: Room }
  systems  :{ [key: number]: System }
}

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector

export type Dispatch = ThunkDispatch<RootState, void, AnyAction>

export const store = createStore(
  reducers,
  applyMiddleware(thunk)
)

export const persistor = persistStore(store)
