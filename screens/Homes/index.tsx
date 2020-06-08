import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Homes from './Homes'

const stack = createStackNavigator()

export default () => (
  <stack.Navigator initialRouteName="homes">
    <stack.Screen 
      name="homes" 
      component={Homes} 
      options={{ header: () => null }} 
    />
  </stack.Navigator>
)
