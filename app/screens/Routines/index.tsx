import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Header } from '../../components'
import * as screens from './screens'

const Stack = createStackNavigator()

export default () => {
  return (
    <Stack.Navigator
      initialRouteName="routines"
      screenOptions={{
        header: Header
      }}
    >
      <Stack.Screen
        name="routines"
        component={screens.Routines}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="routine"
        component={screens.Routine}
      />
    </Stack.Navigator>
  )
}