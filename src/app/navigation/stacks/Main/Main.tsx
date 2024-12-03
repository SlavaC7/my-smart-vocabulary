import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { CommonScreens } from '@/screens/Common'

import { EScreens } from '../../screens'
import { NativeScreenNavigationOptions } from '../options'

import { EStacks } from '../stacks'
import { TabsStack } from '../Tabs'

import { TMainStack } from './types'

const Stack = createNativeStackNavigator<TMainStack>()

export const MainStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={EStacks.Tabs}
      screenOptions={{
        ...NativeScreenNavigationOptions,
      }}>
      {/* also using EStacks */}
      <Stack.Screen component={TabsStack} name={EStacks.Tabs} />

      <Stack.Screen component={CommonScreens.Word} name={EScreens.WordMain} />
    </Stack.Navigator>
  )
}
