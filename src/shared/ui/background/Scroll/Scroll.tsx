import React from 'react'

import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native'

import { appPadding } from '@/shared/lib'

import { scrollViewProps } from './config'
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
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}>
        <ScrollView
          style={[
            { paddingHorizontal: pHorizontal, paddingTop: pTop },
            styles.container,
          ]}
          keyboardShouldPersistTaps="handled"
          {...scrollViewProps}
          bounces={false}
          {...props}>
          <ScrollContainer>{children}</ScrollContainer>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  )
}
