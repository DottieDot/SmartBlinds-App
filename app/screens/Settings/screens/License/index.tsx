import React, { useState, useEffect } from 'react'
import { View, Linking } from 'react-native'
import { ProgressBar, Appbar } from 'react-native-paper'
import { WebView } from 'react-native-webview'
import { useTheme, useNavigation } from '@react-navigation/native'
import { StackHeaderProps } from '@react-navigation/stack'
import { useNavigationParams } from '../../../../util/Navigation'
import { AppbarHeader } from '../../../../components'

export const Header = ({ navigation, scene: { descriptor: { options } } }: StackHeaderProps) => {
  const params = useNavigationParams()
  const data = params?.data

  return (
    <AppbarHeader style={options.headerStyle}>
      <Appbar.BackAction onPress={() => navigation.goBack()} />
      <Appbar.Content title={data?.name} />
      <Appbar.Action
        icon="open-in-new"
        onPress={() => {
          if (Linking.canOpenURL(data?.repository)) {
            Linking.openURL(data?.repository)
          }
        }}
      />
    </AppbarHeader>
  )
}

export default ({ route }: any) => {
  const [loading, setLoading] = useState(true)
  const theme = useTheme()
  const [content, setContent] = useState('')

  useEffect(() => {
    fetch(route.params.data.license_file)
      .then(res => res.text())
      .then(body => {
        setContent(body.replace(/<\s*\/\s*pre/g, ''))
        setLoading(false)
      })
      .catch(() => {
        setContent('Failed to load license')
      })
  }, [])

  return (
    <View style={{ flex: 1 }}>
      {loading && <ProgressBar indeterminate />}
      <WebView
        source={{ html: `<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"><style>body { color: ${theme.colors.text}; margin: 16; }</style></head><body><pre>${content}</pre></body></html>` }}
        style={{
          backgroundColor: theme.colors.background,
        }}
      />
    </View>
  )
}
