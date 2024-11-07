import { EStacks, THomeStack } from '../../stacks'
import { TNavigatorScreenParams } from '../../types'

export type TMainTab = {
  [EStacks.Home]: TNavigatorScreenParams<THomeStack>
}
