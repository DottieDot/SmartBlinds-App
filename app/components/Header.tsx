import React from 'react'
import { StackHeaderProps } from '@react-navigation/stack'
import { Appbar } from 'react-native-paper'
import AppBarHeader from './AppbarHeader'

export default ({ navigation, scene: { descriptor: { options }, route } }: StackHeaderProps) => {
  const firstRoute = navigation.dangerouslyGetState()?.routes[0].key === route.key

  return (
    <AppBarHeader style={options.headerStyle}>
      {!firstRoute ? <Appbar.BackAction onPress={() => navigation.goBack()} /> : null}
      <Appbar.Content title={options.title ?? route.name} />
    </AppBarHeader>
  )
}
