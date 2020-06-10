import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Homes } from '../screens'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'

const Tab = createMaterialBottomTabNavigator()

// sceneAnimationEnabled disabled due to a bug
export default () => (
  <Tab.Navigator
    initialRouteName="homes"
    shifting={true}
    sceneAnimationEnabled={false} 
  >
    <Tab.Screen
      name="homes"
      component={Homes}
      options={{
        tabBarLabel: 'Homes',
        tabBarIcon: "home",
      }}
    />
    <Tab.Screen
      name="routines"
      component={Homes}
      options={{
        tabBarLabel: 'Routines',
        tabBarIcon: "home",
      }}
    />
    <Tab.Screen
      name="settings"
      component={Homes}
      options={{
        tabBarLabel: 'Settings',
        tabBarIcon: "settings",
      }}
    />
  </Tab.Navigator>
)

