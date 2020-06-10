import { combineReducers } from 'redux'

import homes from './homes'
import rooms from './rooms'
import systems from './systems'
import auth from './auth'

export default combineReducers({
  homes,
  rooms,
  systems,
  auth,
})
