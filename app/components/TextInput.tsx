import React from 'react'
import { TextInput, HelperText } from 'react-native-paper'
import { TextInputProps } from 'react-native-paper/src/components/TextInput/TextInput'
import { useField } from 'formik'
import { ViewStyle, StyleProp, TextStyle, View } from 'react-native'

const typeProps: { [key: string]: Omit<TextInputProps, 'theme'> } = {
  password: {
    textContentType: 'password',
    keyboardType: 'default',
    autoCapitalize: 'none',
    autoCompleteType: 'password',
    secureTextEntry: true,
    maxLength: 70, // BCrypt limit
  },
  name: {
    textContentType: 'name',
    autoCompleteType: 'name',
  },
  nickname: {
    textContentType: 'nickname',
  },
  email: {
    textContentType: 'emailAddress',
    autoCompleteType: 'email',
    autoCapitalize: 'none',
    keyboardType: 'email-address',
  },
  default: {

  }
}

interface Props extends Omit<TextInputProps, 'theme'|'style'> {
  type           ?: 'password' | 'name' | 'nickname' | 'email',
  name           ?: string
  style          ?: StyleProp<ViewStyle>
  inputStyle     ?: StyleProp<ViewStyle>
  helperTextStyle?: StyleProp<TextStyle>
}

export default ({ type, name, style, inputStyle, helperTextStyle, ...props }: Props) => {
  const [field, meta] = name ? useField(name) : []
  
  return (
    <View style={style}>
      <TextInput
        {...typeProps[type ?? 'default']}
        onChangeText={field?.onChange(name)}
        onBlur={field?.onBlur(name) as any}
        value={field?.value}
        error={!!meta?.error}
        style={inputStyle}
        {...props}
      />
      <HelperText 
        visible={!!meta?.error}
        type="error"
        style={helperTextStyle}
      >
        {meta?.error}
      </HelperText>
    </View>
  )
}
