import 'react-native-gesture-handler'

import React, { useEffect } from 'react';
import { Provider as ReduxProvider, useDispatch } from 'react-redux'
import { Provider as PaperProvider, Portal } from 'react-native-paper'
import { store, persistor, useTypedSelector } from './store'
import * as navigators from './navigators'
import { NavigationContainer, DefaultTheme as DefaultRNavigationTheme, DarkTheme as RNavigationDarkTheme, useTheme } from '@react-navigation/native'
import OAuth2 from './util/OAuth2'
import { SetLoggedIn } from './store/actions/auth'
import { DefaultTheme as DefaultPaperTheme, DarkTheme as PaperDarkTheme } from 'react-native-paper'
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import * as api from './api'
import * as SplashScreen from 'expo-splash-screen'
import * as screens from './screens'
import { StatusBar } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import Color from 'color';

const combinedLightTheme = {
  ...DefaultRNavigationTheme,
  ...DefaultPaperTheme,
  colors: {
    ...DefaultRNavigationTheme.colors,
    ...DefaultPaperTheme.colors,
    primary: '#ff7144',
    accent: '#ff7144',
  },
}

const combinedDarkTheme = {
  ...RNavigationDarkTheme,
  ...PaperDarkTheme,
  colors: {
    ...RNavigationDarkTheme.colors,
    ...PaperDarkTheme.colors,
    primary: '#ff7144',
    accent: '#ff7144',
  },
};

const DarkStatusBar = () => {
  const theme = useTheme()
  return (
    <StatusBar
      barStyle={(theme.dark) ? 'light-content' : 'dark-content'}
      backgroundColor="transparent"
      translucent
    />
  )
}

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

      setTimeout(() => SplashScreen.hideAsync(), 1000)
    }
    fn()
  }, [])

  return (
    <Portal.Host>
      <DarkStatusBar />
      {auth.loggedIn ? (
        <navigators.BottomTabs />
      ) : (
          <screens.Auth />
        )}
    </Portal.Host>
  )
}

// Redux store is needed
const ThemeWrapper = () => {
  const systemTheme = useColorScheme()
  let selectedTheme: string = useTypedSelector(state => state.settings.theme)

  selectedTheme = selectedTheme === 'system' ? systemTheme : selectedTheme
  const theme = selectedTheme === 'dark' ? combinedDarkTheme : combinedLightTheme

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <AppRoot />
      </NavigationContainer>
    </PaperProvider>
  )
}

export default () => {
  return (
    <ReduxProvider store={store}>
      <PersistGate persistor={persistor}>
        <AppearanceProvider>
          <ThemeWrapper />
        </AppearanceProvider>
      </PersistGate>
    </ReduxProvider>
  )
} 
