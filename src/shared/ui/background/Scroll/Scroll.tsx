import React from 'react'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { appPadding } from '@/shared/lib'

import { keyboardAwareViewProps } from './config'
import { ScrollContainer, styles } from './styled'
import { ScrollProps } from './types'

export const Scroll = ({
  children,
  pTop = 0,
  pHorizontal = appPadding,
  ...props
}: ScrollProps) => {
  return (
    <>
      <KeyboardAwareScrollView
        style={[
          { paddingHorizontal: pHorizontal, paddingTop: pTop },
          styles.container,
        ]}
        extraScrollHeight={-160}
        enableOnAndroid
        keyboardShouldPersistTaps="handled"
        {...keyboardAwareViewProps}
        bounces={false}
        {...props}>
        <ScrollContainer>{children}</ScrollContainer>
      </KeyboardAwareScrollView>
    </>
  )
}
