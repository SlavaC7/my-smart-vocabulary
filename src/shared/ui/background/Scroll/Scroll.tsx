import React from 'react'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { keyboardAwareViewProps } from './config'
import { ScrollContainer, styles } from './styled'
import { ScrollProps } from './types'

export const Scroll = ({
  children,
  pHorizontal = 0,
  ...props
}: ScrollProps) => {
  return (
    <>
      <KeyboardAwareScrollView
        style={[{ paddingHorizontal: pHorizontal }, styles.container]}
        extraScrollHeight={70}
        enableOnAndroid
        {...keyboardAwareViewProps}
        {...props}
        bounces={true}>
        <ScrollContainer>{children}</ScrollContainer>
      </KeyboardAwareScrollView>
    </>
  )
}
