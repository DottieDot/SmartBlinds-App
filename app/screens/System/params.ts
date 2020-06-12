import { RouteProp, NavigationProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

type SystemStackParamList = {
  system: {
    system: number
  }
}

export type SystemScreenNavigationProp = StackNavigationProp<SystemStackParamList, 'system'>
export type SystemScreenRouteProp = RouteProp<SystemStackParamList, 'system'>

export type SystemStackNavigation = NavigationProp<SystemStackParamList>
