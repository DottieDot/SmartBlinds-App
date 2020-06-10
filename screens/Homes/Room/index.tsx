import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { RoomScreenRouteProp, RoomScreenNavigationProp } from '../params';
import { View } from 'react-native'
import * as screens from './screens'

interface Props {
  route: RoomScreenRouteProp
  navigation: RoomScreenNavigationProp
}

const Tab = createMaterialTopTabNavigator()

const Placeholder = () => {
  return <View></View>
}

export default ({ route }: Props) => {
  return (
    <Tab.Navigator backBehavior="none">
      <Tab.Screen name="State" component={screens.State} initialParams={route.params} />
      <Tab.Screen name="Systems" component={screens.Systems} initialParams={route.params} />
      <Tab.Screen name="Settings" component={screens.Settings} initialParams={route.params} />
    </Tab.Navigator>
  )
}
