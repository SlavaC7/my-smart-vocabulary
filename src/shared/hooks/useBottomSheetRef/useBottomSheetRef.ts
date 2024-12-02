import { useImperativeHandle, useRef } from 'react'

import { TBottomSheetModalRef } from '@/shared/ui/bottomSheet/Modal'

export const useBottomSheetRef = (
  ref?: React.ForwardedRef<TBottomSheetModalRef>,
) => {
  const bottomSheetRef = useRef<TBottomSheetModalRef>(null)

  useImperativeHandle(ref, () => ({
    open: () => {
      bottomSheetRef.current?.open()
    },
    close: () => {
      bottomSheetRef.current?.close()
    },
    collapse: () => {
      bottomSheetRef.current?.collapse()
    },
    expand: () => {
      bottomSheetRef.current?.expand()
    },
  }))

  return bottomSheetRef
}
