import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Homes from './Homes'
import Room from './Room'
import { Header } from '../../components'
import System from '../System'
import { Header as RoomHeader } from './Room'

const Stack = createStackNavigator()

export default () => {
  return (
    <Stack.Navigator
      initialRouteName="homes"
      screenOptions={{
        header: Header
      }}
    >
      <Stack.Screen
        name="homes"
        component={Homes}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="room"
        component={Room}
        options={{
          headerStyle: {
            elevation: 0
          },
          header: (props) => <RoomHeader {...props} />
        }}
      />
      <Stack.Screen 
        name="system"
        component={System}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  )
}