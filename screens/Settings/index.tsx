import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Header } from '../../components'
import * as screens from './screens'

const Stack = createStackNavigator()

export default () => {
  return (
    <Stack.Navigator
      initialRouteName="settings"
      screenOptions={{
        header: Header
      }}
    >
      <Stack.Screen
        name="settings"
        component={screens.Settings}
        options={{
          title: 'Settings'
        }}
      />
      <Stack.Screen
        name="app_settings"
        component={screens.AppSettings}
        options={{
          title: 'App Settings'
        }}
      />
    </Stack.Navigator>
  )
}
