import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { HomeScreens } from '@/screens/Home'

import { SearchScreens } from '@/screens/Search'

import { EScreens } from '../../screens'
import { NativeScreenNavigationOptions } from '../options'

import { THomeStack } from './types'

const Stack = createNativeStackNavigator<THomeStack>()

export const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={EScreens.HomeMain}
      screenOptions={{
        ...NativeScreenNavigationOptions,
      }}>
      <Stack.Screen component={HomeScreens.Main} name={EScreens.HomeMain} />
      <Stack.Screen
        component={SearchScreens.OwnTranslation}
        name={EScreens.SearchOwnTranslation}
      />
    </Stack.Navigator>
  )
}
