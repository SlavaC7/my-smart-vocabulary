import { BottomSheetModalProps } from '@gorhom/bottom-sheet'

export type TBottomSheetModalProps = {
  onOpen?: () => void
} & Partial<BottomSheetModalProps>

export type TBottomSheetModalRef = {
  open: () => void
  close: () => void
  collapse: () => void
  expand: () => void
}
