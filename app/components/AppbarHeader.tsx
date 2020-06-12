import React from 'react'
import { Appbar } from 'react-native-paper'
import { StatusBar } from 'react-native'

type HeaderProps = React.ComponentProps<typeof Appbar.Header>

export default (props: HeaderProps) => (
  <React.Fragment>
    <Appbar.Header {...props} />
    <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
  </React.Fragment>
)
