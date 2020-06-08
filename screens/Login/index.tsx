import React, { useState } from 'react'
import { View } from 'react-native'
import style from './style'
import { Text, TextInput, Button } from 'react-native-paper'
import OAuth2 from '../../util/OAuth2'
import { useNavigation } from '@react-navigation/native'
import { SetLoggedIn } from '../../store/actions/auth'
import { useDispatch } from 'react-redux'
import * as api from '../../api'

export default () => {
  const [submitting, setSubmitting] = useState(false)
  const [email, setEmail ] = useState('')
  const [password, setPassword ] = useState('')
  const [error, setError] = useState('')
  const dispatch = useDispatch()

  const login = async () => {
    setSubmitting(true)
    setError('')

    const result = await OAuth2.Authenticate(email, password)

    if (result) {
      const user = await api.GetUser()

      if (user) {
        dispatch(SetLoggedIn(user))
      }
      else {
        // Server error, not sure how to display this yet...
      }
    }
    else {
      setSubmitting(false)
      setError('Incorrect username or password')
    }
  }

  return (
    <View style={style.root}>
      <Text style={style.title}>
        Sign In
      </Text>
      <TextInput
        style={style.textInput}
        label="E-Mail"
        textContentType="emailAddress"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCompleteType="email"
        value={email}
        onChangeText={setEmail}
        autoFocus={true}
        returnKeyType="next"
        disabled={submitting}
        error={!!error}
      />
      <TextInput
        style={style.textInput}
        label="Password"
        textContentType="password"
        keyboardType="default"
        autoCapitalize="none"
        autoCompleteType="password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
        returnKeyType="send"
        disabled={submitting}
        onSubmitEditing={login}
        error={!!error}
      />
      <Button 
        mode="contained"
        disabled={submitting}
        loading={submitting}
        onPress={login}
      >
        Sign In
      </Button>
    </View>
  )
}
