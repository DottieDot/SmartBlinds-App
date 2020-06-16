import React from 'react'
import { Appbar } from 'react-native-paper'
import { StatusBar } from 'react-native'
import HeaderStatusBar from './HeaderStatusBar'

type HeaderProps = React.ComponentProps<typeof Appbar.Header>

export default (props: HeaderProps) => (
  <React.Fragment>
    <Appbar.Header {...props} />
    <HeaderStatusBar />
  </React.Fragment>
)
