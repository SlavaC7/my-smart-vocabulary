import React from 'react'

import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'

import { Footer } from '@/widgets/footer'

import { EStacks, HomeStack, ProfileStack } from '..'

import { ChatStack } from '../Chat'
import { NotificationStack } from '../Notification'
import { ScreenTabOptions } from '../options'

import { WalletStack } from '../Wallet'

import { TTabsStack } from './types'

const Tab = createBottomTabNavigator<TTabsStack>()

const tabBar = (props: BottomTabBarProps) => {
  return <Footer.BottomTab {...props} />
}

export const TabsStack = () => {
  return (
    <Tab.Navigator
      initialRouteName={EStacks.Home}
      backBehavior="initialRoute"
      screenOptions={ScreenTabOptions}
      tabBar={tabBar}>
      <Tab.Screen name={EStacks.Home} component={HomeStack} />
      <Tab.Screen name={EStacks.Chats} component={ChatStack} />
      <Tab.Screen name={EStacks.Wallet} component={WalletStack} />
      <Tab.Screen name={EStacks.Notification} component={NotificationStack} />
      <Tab.Screen name={EStacks.Profile} component={ProfileStack} />
    </Tab.Navigator>
  )
}
