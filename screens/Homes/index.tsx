import React from 'react'
import { createStackNavigator, StackHeaderProps } from '@react-navigation/stack'
import Homes from './Homes'
import Room from './Room'
import { useTypedSelector } from '../../store'
import { roomSelector } from '../../store/selectors'
import { useNavigationState } from '@react-navigation/native'
import { RoomScreenRouteProp } from './params'
import { Appbar } from 'react-native-paper'
import { Header, AppbarHeader } from '../../components'
import System from '../System'
import { useNavigationParams } from '../../util/Navigation'

const Stack = createStackNavigator()

const RoomHeader = ({ navigation, scene: { descriptor: { options } } }: StackHeaderProps) => {
  const params = useNavigationParams() as RoomScreenRouteProp['params']
  const room = useTypedSelector(roomSelector(params?.room))

  return (
    <AppbarHeader style={options.headerStyle}>
      <Appbar.BackAction onPress={() => navigation.goBack()} />
      <Appbar.Content title={room?.name} />
    </AppbarHeader>
  )
}

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