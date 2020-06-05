import reducers from './reducers'
import { createStore } from 'redux'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { IAuth } from './model'

interface IRootState {
  auth: IAuth
}

export const useTypedSelector: TypedUseSelectorHook<IRootState> = useSelector

export default createStore(reducers)
