import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Header } from '../../components'
import { Header as RoutineHeader } from './screens/Routine'
import * as screens from './screens'
import RoomSelect from '../RoomSelect'

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
        options={{
          header: (props) => <RoutineHeader {...props} />
        }}
      />
      <Stack.Screen
        name="room_select"
        component={RoomSelect}
        options={{
          title: 'Select a room'
        }}
      />
    </Stack.Navigator>
  )
}