import * as Stacks from '..'
import { EStacks } from '..'
import { TNavigatorScreenParams } from '../../types'

export type TTabsStack = {
  [EStacks.Home]: TNavigatorScreenParams<Stacks.THomeStack>
  [EStacks.Tests]: TNavigatorScreenParams<Stacks.TTestsStack>
  [EStacks.Profile]: TNavigatorScreenParams<Stacks.TProfileStack>
}
