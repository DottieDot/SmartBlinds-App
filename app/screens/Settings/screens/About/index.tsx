import React from 'react'
import { List, Divider } from 'react-native-paper'
import { ScrollView } from 'react-native-gesture-handler'
import Constants from 'expo-constants'
import pkg from '../../../../app.json'
import OpenAppInStore from '../../../../util/OpenAppInStore'
import { useNavigation } from '@react-navigation/native'

export default () => {
  const { navigate } = useNavigation()

  return (
    <ScrollView>
      <List.Item
        title="Send feedback"
        description="Help us make SmartBlinds better"
        onPress={() => OpenAppInStore()}
      />
      <Divider />
      <List.Item
        title="Terms of Service"
        description="Read SmartBlind's ToS"
        onPress={() => navigate('tos')}
      />
      <Divider />
      <List.Item
        title="Open source licenses"
        description="License details for open software"
        onPress={() => navigate('licenses')}
      />
      <Divider />
      <List.Item
        title="APK version"
        description={Constants.nativeAppVersion}
      />
      <Divider />
      <List.Item
        title="JS Bundle version"
        description={pkg.expo.version}
      />
    </ScrollView>
  )
}
