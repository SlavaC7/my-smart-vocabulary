import { TIconsKeys } from '@assets/svg'

import { EStacks } from '@/app/navigation'

export type KeysOfEStacks =
  | EStacks.Home
  | EStacks.Search
  | EStacks.Statistics
  | EStacks.Tests

export type TUseTabs = {
  title: string
  Icon: TIconsKeys
  ActiveIcon: TIconsKeys
}
