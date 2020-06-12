import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'

import homes from './homes'
import rooms from './rooms'
import systems from './systems'
import settings from './settings'
import auth from './auth'
import { AsyncStorage } from 'react-native'

const settingsPersistConfig = { 
  key: 'settings', 
  storage: AsyncStorage,
}

export default combineReducers({
  homes,
  rooms,
  systems,
  settings: persistReducer(settingsPersistConfig, settings),
  auth,
})
