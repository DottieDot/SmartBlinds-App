import React from 'react'
import { createStackNavigator, StackHeaderProps } from '@react-navigation/stack'
import { SystemScreenRouteProp, SystemScreenNavigationProp } from './params'
import { Appbar } from 'react-native-paper'
import { Header, AppbarHeader } from '../../components'
import * as screens from './screens'
import { SystemContextProvier, useSystem } from './context'

const Stack = createStackNavigator()

interface SystemHeaderProps extends StackHeaderProps {
  subtitle?: string
}

const SystemHeader = ({ navigation, scene: { descriptor: { options } }, subtitle }: SystemHeaderProps) => {
  const system = useSystem()

  return (
    <AppbarHeader style={options.headerStyle}>
      <Appbar.BackAction onPress={() => navigation.goBack()} />
      <Appbar.Content title={system?.name} subtitle={subtitle} />
    </AppbarHeader>
  )
}

interface Props {
  route: SystemScreenRouteProp
  navigation: SystemScreenNavigationProp
}

export default ({ route }: Props) => {
  return (
    <SystemContextProvier value={route.params.system}>
      <Stack.Navigator
        initialRouteName="system"
        screenOptions={{
          header: Header
        }}
      >
        <Stack.Screen
          name="system"
          component={screens.System}
          options={{
            header: (props) => <SystemHeader {...props} />
          }}
        />
        <Stack.Screen
          name="room_select"
          component={screens.RoomSelect}
          options={{
            header: (props) => <SystemHeader {...props} subtitle="Select a new room" />
          }}
        />
      </Stack.Navigator>
    </SystemContextProvier>
  )
}