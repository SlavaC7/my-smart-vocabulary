import { TIconsKeys } from '@assets/svg'

import { EStacks } from '@/app/navigation'

export type KeysOfEStacks = EStacks.Home | EStacks.Main

export type TUseTabs = {
  title: string
  Icon: TIconsKeys
  ActiveIcon: TIconsKeys
}
