import { combineReducers } from 'redux'

import homes from './homes'
import rooms from './rooms'
import auth from './auth'

export default combineReducers({
  homes,
  rooms,
  auth,
})
