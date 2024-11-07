import { ETab } from '../../tabs'
import { TMainTab } from '../../tabs/Main/types'
import { TNavigatorScreenParams } from '../../types'

export type TMainStack = {
  //Add stack/screens ad this types for stack
  [ETab.Main]: TNavigatorScreenParams<TMainTab>
}
