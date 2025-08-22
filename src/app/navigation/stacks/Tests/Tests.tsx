import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { TestsScreens } from '@/screens/Quiz'

import { EScreens } from '../../screens'
import { NativeScreenNavigationOptions } from '../options'

import { TTestsStack } from './types'

const Stack = createNativeStackNavigator<TTestsStack>()

export const TestsStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={EScreens.TestsMain}
      screenOptions={{
        ...NativeScreenNavigationOptions,
      }}>
      <Stack.Screen component={TestsScreens.Main} name={EScreens.TestsMain} />
      <Stack.Screen
        component={TestsScreens.Config}
        name={EScreens.TestsConfig}
      />
      <Stack.Screen
        component={TestsScreens.Questions}
        name={EScreens.TestsQuestion}
      />
      <Stack.Screen
        component={TestsScreens.Success}
        name={EScreens.TestsSuccess}
      />
    </Stack.Navigator>
  )
}
