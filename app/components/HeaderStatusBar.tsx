import React from 'react'
import { useTheme } from '@react-navigation/native'
import { StatusBar } from 'react-native'
import Color from 'color'

export default () => {
  const theme = useTheme()

  return (
    <StatusBar
      barStyle={(theme.dark || Color(theme.colors.primary).isDark()) ? 'light-content' : 'dark-content'}
      backgroundColor="transparent"
      translucent
    />
  )
}

