import { PropsWithChildren } from 'react'

import { StyleProp, ViewStyle } from 'react-native'

export type TBaseModalProps = PropsWithChildren<{
  modalViewStyle?: StyleProp<ViewStyle>
  onClose?: () => void
  title?: string
  onModalWillShow?: () => void
  hideClose?: boolean
}>

export type TBaseModalRef = {
  open: () => void
  close: () => void
}
