import * as Stacks from '..'
import { EStacks } from '..'
import { TNavigatorScreenParams } from '../../types'

export type TTabsStack = {
  [EStacks.Home]: TNavigatorScreenParams<Stacks.THomeStack>
}

export enum ETab {
  Main = 'MainTab',
}
