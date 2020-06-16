import React, { useState, useEffect } from 'react'
import { useTypedSelector } from '../../../../store'
import { ScrollView } from 'react-native-gesture-handler'
import { Button, HelperText } from 'react-native-paper'
import { View } from 'react-native'
import * as Forms from './forms'
import { TextInput } from '../../../../components'

export default () => {
  return (
    <ScrollView 
      contentContainerStyle={{ 
        padding: 16 
      }}
    >
      <Forms.Details /> 
      <Forms.Password />
    </ScrollView>
  )
}
