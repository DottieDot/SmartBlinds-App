import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { RoomScreenRouteProp, RoomScreenNavigationProp } from '../params'
import * as screens from './screens'
import { RoomContextProvier } from './context'

interface Props {
  route: RoomScreenRouteProp
  navigation: RoomScreenNavigationProp
}

const Tab = createMaterialTopTabNavigator()

export default ({ route }: Props) => {
  return (
    <RoomContextProvier value={route.params.room}>
      <Tab.Navigator backBehavior="none">
        <Tab.Screen name="State" component={screens.State} />
        <Tab.Screen name="Systems" component={screens.Systems} />
        <Tab.Screen name="Settings" component={screens.Settings} />
      </Tab.Navigator>
    </RoomContextProvier>
  )
}
