import { TIconsKeys } from '@assets/svg'

export type TMenuItem = {
  icon: TIconsKeys
  title: string
  onPress: () => void
}
