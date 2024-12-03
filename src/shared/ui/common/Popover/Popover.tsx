import React, { forwardRef } from 'react'

import PopoverComponent from 'react-native-popover-view'

import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { isIos } from '@/shared/lib'

import { popoverStyles } from './styles'
import { TPopoverProps } from './types'

export const Popover = forwardRef<PopoverComponent, TPopoverProps>(
  ({ children, ...props }, ref) => {
    const { top } = useSafeAreaInsets()
    const verticalOffset = isIos ? 0 : -top
    const styles = popoverStyles
    return (
      <PopoverComponent
        ref={ref}
        popoverStyle={[
          isIos ? styles.shadowIos : styles.shadowAndroid,
          styles.popover,
        ]}
        backgroundStyle={styles.background}
        verticalOffset={verticalOffset}
        arrowSize={{ width: 0, height: 0 }}
        {...props}>
        {children}
      </PopoverComponent>
    )
  },
)
