import 'react-native-gesture-handler'

import React from 'react';
import { Provider as ReduxProvider } from 'react-redux'
import { Provider as PaperProvider } from 'react-native-paper'
import store from './store'
import * as navigators from './navigators'
import { NavigationContainer } from '@react-navigation/native'

export default () => {
  return (
    <ReduxProvider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <navigators.BottomTabs />
        </NavigationContainer>
      </PaperProvider>
    </ReduxProvider>
  )
} 
