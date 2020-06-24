import { RouteProp, NavigationProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

type RoutinesStackParamList = {
  routines: undefined
  routine: {
    routine: number
  }
}

export type RoutineScreenNavigationProp = StackNavigationProp<RoutinesStackParamList, 'routine'>
export type RoutineScreenRouteProp = RouteProp<RoutinesStackParamList, 'routine'>

export type RoutinesStackNavigation = NavigationProp<RoutinesStackParamList>
