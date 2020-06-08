import React from 'react'
import { View } from 'react-native'
import { Text, Button } from 'react-native-paper'
import style from './style'
import { useNavigation } from '@react-navigation/native'

export default () => {
  const { navigate } = useNavigation()

  return (
    <View style={style.root}>
      <Text style={style.title}>
        Welcome
      </Text>
      <Button 
        mode="contained"
        style={style.button}
        onPress={() => navigate('login')}
      >
        Sign In
      </Button>
      <Button 
        mode="text"
        style={style.button}
        onPress={() => navigate('register')}
      >
        Sign Up
      </Button>
    </View>
  )
}
