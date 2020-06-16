import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Header } from '../../components'
import Home, { Header as HomeHeader } from '../Home'
import { Header as LicenseHeader } from './screens/License'
import * as screens from './screens'
import System from '../System'

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
        name="about"
        component={screens.About}
        options={{
          title: 'About'
        }}
      />
      <Stack.Screen
        name="tos"
        component={screens.Tos}
        options={{
          title: 'Terms of Service'
        }}
      />
      <Stack.Screen
        name="licenses"
        component={screens.Licenses}
        options={{
          title: 'Open source licenses'
        }}
      />
      <Stack.Screen
        name="license"
        component={screens.License}
        options={{
          header: (props) => <LicenseHeader {...props} />
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
      <Stack.Screen
        name="systems_settings"
        component={screens.SystemsSettings}
        options={{
          title: 'Unlinked Systems'
        }}
      />
      <Stack.Screen
        name="system"
        component={System}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="account_settings"
        component={screens.AccountSettings}
        options={{
          title: 'Account'
        }}
      />
    </Stack.Navigator>
  )
}
