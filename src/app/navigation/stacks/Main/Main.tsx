import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { useTypedSelector } from '@/app/store'

import { CommonScreens } from '@/screens/Common'

import { SearchScreens } from '@/screens/Search'

import { getUserSelector } from '@/entities/user/store'

import { EScreens } from '../../screens'
import { AuthStack } from '../Auth'
import { NativeScreenNavigationOptions } from '../options'

import { EStacks } from '../stacks'
import { TabsStack } from '../Tabs'

import { TMainStack } from './types'

const Stack = createNativeStackNavigator<TMainStack>()

export const MainStack = () => {
  const { user } = useTypedSelector(getUserSelector)

  const isUser = !!user
  return (
    <Stack.Navigator
      initialRouteName={isUser ? EStacks.Tabs : EStacks.Auth}
      screenOptions={{
        ...NativeScreenNavigationOptions,
      }}>
      {!isUser && <Stack.Screen component={AuthStack} name={EStacks.Auth} />}
      {isUser && (
        <>
          <Stack.Screen component={TabsStack} name={EStacks.Tabs} />
          <Stack.Screen
            component={CommonScreens.Word}
            name={EScreens.WordMain}
          />
          <Stack.Screen
            component={SearchScreens.OwnTranslation}
            name={EScreens.SearchOwnTranslation}
          />
        </>
      )}
    </Stack.Navigator>
  )
}
