import { BottomSheetModalProps } from '@gorhom/bottom-sheet'

export type TBottomSheetModalProps = Partial<BottomSheetModalProps>

export type TBottomSheetModalRef = {
  open: () => void
  close: () => void
  collapse: () => void
  expand: () => void
}
