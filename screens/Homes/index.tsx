import React from 'react'
import { createStackNavigator, HeaderTitle, StackHeaderTitleProps } from '@react-navigation/stack'

import Homes from './Homes'
import Room from './Room'
import { useTypedSelector } from '../../store'
import { roomSelector } from '../../store/selectors'
import { useNavigationState } from '@react-navigation/native'

const Stack = createStackNavigator()

const RoomHeader = (props: StackHeaderTitleProps) => {
  const params = useNavigationState(state => state.routes[state.index].params) as any
  const room = useTypedSelector(roomSelector(params?.id, params?.homeId))

  return (
    <HeaderTitle {...props}>{room?.name}</HeaderTitle>
  )
}

export default () => (
  <Stack.Navigator initialRouteName="homes">
    <Stack.Screen 
      name="homes" 
      component={Homes} 
      options={{ header: () => null }}
    />
    <Stack.Screen 
      name="room"
      component={Room}
      options={{
        headerStyle: {
          elevation: 0,
        },
        headerTitle: (props) => <RoomHeader {...props} />
      }}
    />
  </Stack.Navigator>
)
