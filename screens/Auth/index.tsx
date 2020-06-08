import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Welcome from './Welcome'
import Login from './Login'
import Register from './Register'

const stack = createStackNavigator()

export default () => (
  <stack.Navigator initialRouteName="welcome">
    <stack.Screen 
      name="welcome" 
      component={Welcome} 
      options={{ header: () => null }} 
    />
    <stack.Screen 
      name="login" 
      component={Login} 
    />
    <stack.Screen 
      name="register" 
      component={Register} 
    />
  </stack.Navigator>
)
