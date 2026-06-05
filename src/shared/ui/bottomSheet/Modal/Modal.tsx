import React, {
  useRef,
  forwardRef,
  useImperativeHandle,
  useCallback,
} from 'react'

import { Keyboard } from 'react-native'

import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet'
import { BottomSheetBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types'

import * as S from './styles'
import { TBottomSheetModalRef, TBottomSheetModalProps } from './types'

export const Modal = forwardRef<TBottomSheetModalRef, TBottomSheetModalProps>(
  (
    {
      children,
      snapPoints = [],
      enableDynamicSizing = false,
      onOpen = () => {},
      ...props
    },
    ref,
  ) => {
    const bottomSheetRef = useRef<BottomSheetModal>(null)

    const _onClose = async () => {
      props?.onDismiss?.()
    }

    useImperativeHandle(
      ref,
      () => ({
        open: () => {
          onOpen()
          Keyboard.dismiss()
          bottomSheetRef.current?.present()
        },
        close: async () => {
          bottomSheetRef.current?.dismiss()
        },
        collapse: async () => {
          bottomSheetRef.current?.collapse()
        },
        expand: async () => {
          onOpen()
          bottomSheetRef.current?.expand()
        },
      }),
      [],
    )

    const renderBackdrop = useCallback(
      (backdropProps: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...backdropProps}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          pressBehavior={'close'}
        />
      ),
      [],
    )

    const styles = S.getStyles()

    return (
      <BottomSheetModal
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        enableDynamicSizing={enableDynamicSizing}
        onDismiss={() => _onClose()}
        backdropComponent={renderBackdrop}
        backgroundStyle={styles.background}
        handleIndicatorStyle={styles.indicator}
        keyboardBehavior={'extend'}
        keyboardBlurBehavior={'restore'}
        enableDismissOnClose
        enableContentPanningGesture
        enablePanDownToClose
        {...props}>
        {children}
      </BottomSheetModal>
    )
  },
)
