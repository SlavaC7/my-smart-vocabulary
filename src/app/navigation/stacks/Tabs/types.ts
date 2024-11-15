import * as Stacks from '../../stacks'
import { EStacks } from '../../stacks'
import { TNavigatorScreenParams } from '../../types'
import { TNotificationStack } from '../Notification'

export type TTabsStack = {
  [EStacks.Home]: TNavigatorScreenParams<Stacks.THomeStack>
  [EStacks.Wallet]: undefined
  [EStacks.Notification]: TNavigatorScreenParams<TNotificationStack>
  [EStacks.Profile]: TNavigatorScreenParams<Stacks.TProfileStack>
  [EStacks.Chats]: TNavigatorScreenParams<Stacks.TChatStack>
}
