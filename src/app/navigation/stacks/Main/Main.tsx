import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { NativeScreenNavigationOptions } from '../options'

import { ETab, TabsStack } from '../Tabs'

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
      <Stack.Screen component={TabsStack} name={ETab.Main} />
    </Stack.Navigator>
  )
}
