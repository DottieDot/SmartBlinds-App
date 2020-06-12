import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { RoomScreenRouteProp, RoomScreenNavigationProp } from '../params'
import * as screens from './screens'
import { RoomContextProvier } from './context'
import { useTheme } from 'react-native-paper'
import { getPrimarySurfaceColor } from '../../../util/Colors'
import Color from 'color'

export { default as Header } from './header'

interface Props {
  route: RoomScreenRouteProp
  navigation: RoomScreenNavigationProp
}

const Tab = createMaterialTopTabNavigator()

export default ({ route }: Props) => {
  const theme = useTheme()

  // Elevation for getPrimarySurfaceColor is 0 because the component itself does some internal calculations
  return (
    <RoomContextProvier value={route.params.room}>
      <Tab.Navigator 
        backBehavior="none" 
        tabBarOptions={{
          indicatorStyle: {
            backgroundColor: 'white',
          },
          activeTintColor: 'white',
          inactiveTintColor: Color('white').alpha(.5).toString(),
          style: { backgroundColor: getPrimarySurfaceColor(theme, 0) }
        }}
      >
        <Tab.Screen name="State" component={screens.State} />
        <Tab.Screen name="Systems" component={screens.Systems} />
        <Tab.Screen name="Settings" component={screens.Settings} />
      </Tab.Navigator>
    </RoomContextProvier>
  )
}
