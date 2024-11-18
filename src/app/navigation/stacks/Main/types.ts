import { TNavigatorScreenParams } from '../../types'
import { ETab, TTabsStack } from '../Tabs'

export type TMainStack = {
  //Add stack/screens ad this types for stack
  [ETab.Main]: TNavigatorScreenParams<TTabsStack>
}
