import { TWordScreenParams } from '@/screens/Common/Word/types'

import { TSearchOwnTranslationScreenProps } from '@/screens/Search/OwnTranslation'

import { EScreens } from '../../screens'
import { TNavigatorScreenParams } from '../../types'
import { TAuthStack } from '../Auth'
import { EStacks } from '../stacks'
import { TTabsStack } from '../Tabs'

export type TMainStack = {
  //Add stack/screens ad this types for stack
  [EStacks.Tabs]: TNavigatorScreenParams<TTabsStack>
  [EStacks.Auth]: TNavigatorScreenParams<TAuthStack>
  [EScreens.WordMain]: TWordScreenParams
  [EScreens.SearchOwnTranslation]: TSearchOwnTranslationScreenProps
}
