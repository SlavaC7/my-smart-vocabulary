import React from 'react'

import { KeyboardAwareScrollView } from 'react-native-keyboard-controller'

import { EColors } from '../../styled'

import { keyboardAwareViewProps } from './config'
import { ScrollContainer, styles } from './styled'
import { ScrollProps } from './types'

export const Scroll = ({
  children,
  pHorizontal = 16,
  color = 'background',
  ...props
}: ScrollProps) => {
  return (
    <>
      <KeyboardAwareScrollView
        style={[
          { paddingHorizontal: pHorizontal, backgroundColor: EColors[color] },
          styles.container,
        ]}
        bottomOffset={50}
        {...keyboardAwareViewProps}
        bounces={true}
        {...props}>
        <ScrollContainer>{children}</ScrollContainer>
      </KeyboardAwareScrollView>
    </>
  )
}
