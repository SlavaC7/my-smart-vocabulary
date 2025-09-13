import { TIconsKeys } from '@assets/svg'

import { EStacks } from '@/app/navigation'

export type KeysOfEStacks = EStacks.Home | EStacks.Tests | EStacks.Profile

export type TUseTabs = {
  title: string
  Icon: TIconsKeys
  ActiveIcon: TIconsKeys
}
