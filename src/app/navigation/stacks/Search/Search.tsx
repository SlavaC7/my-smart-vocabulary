import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { SearchScreens } from '@/screens/Search'

import { EScreens } from '../../screens'
import { NativeScreenNavigationOptions } from '../options'

import { TSearchStack } from './types'

const Stack = createNativeStackNavigator<TSearchStack>()

export const SearchStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={EScreens.SearchMain}
      screenOptions={{
        ...NativeScreenNavigationOptions,
      }}>
      <Stack.Screen component={SearchScreens.Main} name={EScreens.SearchMain} />

      <Stack.Screen
        component={SearchScreens.OwnTranslation}
        name={EScreens.SearchOwnTranslation}
      />
    </Stack.Navigator>
  )
}
