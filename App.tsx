import 'react-native-gesture-handler'

import React from 'react';
import { Provider as ReduxProvider } from 'react-redux'
import { Provider as PaperProvider } from 'react-native-paper'
import store, { useTypedSelector } from './store'
import * as navigators from './navigators'
import { NavigationContainer } from '@react-navigation/native'
import { View, Text } from 'react-native';

const AppRoot = () => {
  const auth = useTypedSelector(state => state.auth)

  return (
    <View>
      {auth.loggedIn ? (
        <navigators.BottomTabs />
      ) : (
        <Text>Hey</Text>
      )}
    </View>
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
