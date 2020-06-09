import { RouteProp, NavigationProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

type HomesStackParamList = {
  homes: undefined
  room: {
    room: number
  }
}

export type RoomScreenNavigationProp = StackNavigationProp<HomesStackParamList, 'room'>
export type RoomScreenRouteProp = RouteProp<HomesStackParamList, 'room'>

export type HomesStackNavigation = NavigationProp<HomesStackParamList>
