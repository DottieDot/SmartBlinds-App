import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { useTypedSelector } from '../../../store'
import { roomSelector } from '../../../store/selectors'
import { View } from 'react-native'
import { RoomScreenRouteProp, RoomScreenNavigationProp } from '../params'

interface Props {
  route: RoomScreenRouteProp
  navigation: RoomScreenNavigationProp
}

const Tab = createMaterialTopTabNavigator()

const Placeholder = () => {
  return <View></View>
}

export default ({ route }: Props) => {
  const room = useTypedSelector(roomSelector(route.params.id, route.params.homeId))

  return (
    <Tab.Navigator backBehavior="none">
      <Tab.Screen name="State" component={Placeholder} />
      <Tab.Screen name="Systems" component={Placeholder} />
      <Tab.Screen name="Settings" component={Placeholder} />
    </Tab.Navigator>
  )
}
