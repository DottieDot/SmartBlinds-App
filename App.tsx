import 'react-native-gesture-handler'

import React, { useEffect } from 'react';
import { Provider as ReduxProvider, useDispatch } from 'react-redux'
import { Provider as PaperProvider } from 'react-native-paper'
import store, { useTypedSelector } from './store'
import * as navigators from './navigators'
import { NavigationContainer } from '@react-navigation/native'
import OAuth2 from './util/OAuth2'
import * as api from './api'
import { SetLoggedIn } from './store/actions/auth'
import * as SplashScreen from 'expo-splash-screen'
import * as screens from './screens'

const AppRoot = () => {
  const auth = useTypedSelector(state => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    SplashScreen.preventAutoHideAsync()
    const fn = async () => {
      const res = await OAuth2.LoadCredentials()

      if (res) {
        const user = await api.GetUser()

        if (user) {
          dispatch(SetLoggedIn(user))
        }
      }
      
      await SplashScreen.hideAsync()
    }
    fn()
  }, [])

  return (
    <React.Fragment>
      {auth.loggedIn ? (
        <navigators.BottomTabs />
      ) : (
        <screens.Auth />
      )}
    </React.Fragment>
  )
}

export default () => {
  return (
    <ReduxProvider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <AppRoot />
        </NavigationContainer>
      </PaperProvider>
    </ReduxProvider>
  )
} 
