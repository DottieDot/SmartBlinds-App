import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Header } from '../../components'
import Home, { Header as HomeHeader } from '../Home'
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
      <Stack.Screen
        name="homes_settings"
        component={screens.HomeSettings}
        options={{
          title: 'Homes'
        }}
      />
      <Stack.Screen
        name="home"
        component={Home}
        options={{
          header: (props) => <HomeHeader {...props} />
        }}
      />
    </Stack.Navigator>
  )
}
