import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { AuthScreens } from '@/screens/Auth'

import { EScreens } from '../../screens'
import { NativeScreenNavigationOptions } from '../options'

import { TAuthStack } from './types'

const Stack = createNativeStackNavigator<TAuthStack>()

export const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={EScreens.AuthMain}
      screenOptions={{
        ...NativeScreenNavigationOptions,
      }}>
      <Stack.Screen component={AuthScreens.Main} name={EScreens.AuthMain} />

      <Stack.Screen
        component={AuthScreens.CreateProfile}
        name={EScreens.AuthCreateProfile}
      />
    </Stack.Navigator>
  )
}
