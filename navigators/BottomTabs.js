import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Homes } from '../screens';

const Tab = createBottomTabNavigator()

export default () => (
  <Tab.Navigator
    initialRouteName="homes"
  >
    <Tab.Screen
      name="homes"
      component={Homes}
      options={{
        tabBarLabel: 'Homes',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" color={color} size={size} />
        )
      }}
    />
    <Tab.Screen
      name="routines"
      component={Homes}
      options={{
        tabBarLabel: 'Routines',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" color={color} size={size} />
        )
      }}
    />
    <Tab.Screen
      name="settings"
      component={Homes}
      options={{
        tabBarLabel: 'Settings',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="settings" color={color} size={size} />
        )
      }}
    />
  </Tab.Navigator>
)

