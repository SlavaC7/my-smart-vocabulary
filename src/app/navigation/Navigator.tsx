import React from 'react'

import { NavigationContainer } from '@react-navigation/native'

import { Contexts } from '../contexts'

import { Navigation } from './ref'
import { MainStack } from './stacks'

export const Navigator = () => {
  return (
    <NavigationContainer ref={Navigation.ref}>
      <Contexts>
        <MainStack />
      </Contexts>
    </NavigationContainer>
  )
}
