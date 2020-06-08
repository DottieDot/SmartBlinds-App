import reducers from './reducers'
import { createStore, applyMiddleware } from 'redux'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { Auth, Home } from './model'
import thunk from 'redux-thunk'

interface RootState {
  auth: Auth,
  homes: Home[]
}

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector

export default createStore(
  reducers,
  applyMiddleware(thunk)
)
