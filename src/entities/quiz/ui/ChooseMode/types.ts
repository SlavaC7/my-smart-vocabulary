import { TIconsKeys } from '@assets/svg'

export type TChooseModeProps = Partial<{
  onPress: () => void
  title: string
  description: string
  icon: TIconsKeys
  disable: boolean
}>
