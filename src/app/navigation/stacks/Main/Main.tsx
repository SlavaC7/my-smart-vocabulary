import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { ETab, MainTab } from '../../tabs'
import { NativeScreenNavigationOptions } from '../options'

import { TMainStack } from './types'

const Stack = createNativeStackNavigator<TMainStack>()

export const MainStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={ETab.Main}
      screenOptions={{
        ...NativeScreenNavigationOptions,
      }}>
      {/* also using EStacks */}
      <Stack.Screen component={MainTab} name={ETab.Main} />
    </Stack.Navigator>
  )
}
