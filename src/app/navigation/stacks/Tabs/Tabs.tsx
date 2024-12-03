import React from 'react'

import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'

import { Footer } from '@/widgets/footer'

import { EStacks, HomeStack, SearchStack, StatisticsStack } from '..'

import { ScreenTabOptions } from './options'

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
      <Tab.Screen name={EStacks.Search} component={SearchStack} />
      <Tab.Screen name={EStacks.Statistics} component={StatisticsStack} />
    </Tab.Navigator>
  )
}
