import React from 'react'
import { createStackNavigator, HeaderTitle, StackHeaderTitleProps, StackHeaderProps } from '@react-navigation/stack'
import Homes from './Homes'
import Room from './Room'
import { useTypedSelector } from '../../store'
import { roomSelector } from '../../store/selectors'
import { useNavigationState } from '@react-navigation/native'
import { RoomScreenRouteProp } from './params'
import { Appbar } from 'react-native-paper'

const Stack = createStackNavigator()

const RoomHeader = ({ navigation, scene: { descriptor: { options } } }: StackHeaderProps) => {
  const params = useNavigationState(state => state.routes[state.index].params) as RoomScreenRouteProp['params']
  const room = useTypedSelector(roomSelector(params?.room))

  return (
    <Appbar.Header style={options.headerStyle}>
      <Appbar.BackAction onPress={() => navigation.goBack()} />
      <Appbar.Content title={room?.name} />
    </Appbar.Header>
  )
}

export default () => {
  return (
    <Stack.Navigator
      initialRouteName="homes"
      screenOptions={{
        header: ({ navigation, scene: { descriptor: { options }, route } }) => (
          <Appbar.Header style={options.headerStyle}>
            <Appbar.BackAction onPress={() => navigation.goBack()} />
            <Appbar.Content title={options.title ?? route.name } />
          </Appbar.Header>
        ),
      }}
    >
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
            elevation: 0
          },
          header: (props) => <RoomHeader {...props} />
        }}
      />
    </Stack.Navigator>
  )
}