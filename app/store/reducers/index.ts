import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import { AsyncStorage } from 'react-native'

import homes from './homes'
import rooms from './rooms'
import systems from './systems'
import settings from './settings'
import auth from './auth'
import routines from './routines'
import routineActions from './routineActions'

const settingsPersistConfig = { 
  key: 'settings', 
  storage: AsyncStorage,
}

export default combineReducers({
  homes,
  rooms,
  systems,
  routines,
  routineActions,
  settings: persistReducer(settingsPersistConfig, settings),
  auth,
})
