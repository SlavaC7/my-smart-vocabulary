import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { StatisticsScreens } from '@/screens/Statistics'

import { EScreens } from '../../screens'
import { NativeScreenNavigationOptions } from '../options'

import { TStatisticsStack } from './types'

const Stack = createNativeStackNavigator<TStatisticsStack>()

export const StatisticsStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={EScreens.StatisticsMain}
      screenOptions={{
        ...NativeScreenNavigationOptions,
      }}>
      <Stack.Screen
        component={StatisticsScreens.Main}
        name={EScreens.StatisticsMain}
      />
    </Stack.Navigator>
  )
}
