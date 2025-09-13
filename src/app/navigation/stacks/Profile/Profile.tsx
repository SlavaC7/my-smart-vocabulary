import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { ProfileScreens } from '@/screens/Profile'

import { EScreens } from '../../screens'
import { NativeScreenNavigationOptions } from '../options'

import { TProfileStack } from './types'

const Stack = createNativeStackNavigator<TProfileStack>()

export const ProfileStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={EScreens.ProfileMain}
      screenOptions={{
        ...NativeScreenNavigationOptions,
      }}>
      <Stack.Screen
        component={ProfileScreens.Main}
        name={EScreens.ProfileMain}
      />
    </Stack.Navigator>
  )
}
