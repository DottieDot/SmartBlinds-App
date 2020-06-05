import { combineReducers } from 'redux'

import homes from './homes'
import auth from './auth'

export default combineReducers({
  homes,
  auth,
})
