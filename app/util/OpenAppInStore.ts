import Constants from 'expo-constants'
import { Linking } from 'react-native'
import pkg from '../app.json'

export default () => {
  if (Constants.platform?.ios) {
    Linking.openURL(`itms-apps://itunes.apple.com/us/app/apple-store/${pkg.expo.ios.bundleIdentifier}?mt=8`)
  }
  else if (Constants.platform?.android) {
    Linking.openURL(`market://details?id=${pkg.expo.android.package}`)
  }
}
