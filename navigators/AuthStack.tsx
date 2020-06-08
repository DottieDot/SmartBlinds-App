import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import * as screens from '../screens'

const stack = createStackNavigator()

export default () => (
  <stack.Navigator initialRouteName="welcome">
    <stack.Screen 
      name="welcome" 
      component={screens.Welcome} 
      options={{ header: () => null }} 
    />
    <stack.Screen 
      name="login" 
      component={screens.Login} 
    />
    <stack.Screen 
      name="register" 
      component={screens.Register} 
    />
  </stack.Navigator>
)
