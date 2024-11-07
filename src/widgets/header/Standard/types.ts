import { TIconsKeys } from '@assets/svg'

import { TIconProps } from '@/shared/ui/Icon/types'

export type TStandardProps = {
  title?: string
  goBack?: boolean
  icon?: TIconsKeys
  iconProps?: Omit<TIconProps, 'name'>
  onPress?: () => void
  onGoBack?: () => void
}
