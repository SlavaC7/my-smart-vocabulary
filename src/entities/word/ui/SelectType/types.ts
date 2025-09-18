import { TMargin } from '@/shared'

export type TSelectTypeProps = {
  text: string
  active: boolean
  onPress: () => void
} & TMargin
