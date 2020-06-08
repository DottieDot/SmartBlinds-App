import React from 'react'
import { View } from 'react-native'
import { useTypedSelector } from '../store'

export default () => {
  const homes = useTypedSelector(state => state.homes)

  return (
    <View>

    </View>
  )
}
