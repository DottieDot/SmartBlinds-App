import { useRoute, useNavigationState } from '@react-navigation/native'

export const useIsFirstRouteInParent = () => {
  const route = useRoute()
  const isFirstRouteInParent = useNavigationState(
    state => state.routes[0].key === route.key
  )

  return isFirstRouteInParent
}

export const useNavigationParams = (): any => {
  return useNavigationState(
    state => state.routes[state.index].params
  )
}
