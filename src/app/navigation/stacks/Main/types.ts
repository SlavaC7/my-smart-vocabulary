import { TWordScreenParams } from '@/screens/Common/Word/types'

import { TSearchOwnTranslationScreenProps } from '@/screens/Search/OwnTranslation'

import { EScreens } from '../../screens'
import { TNavigatorScreenParams } from '../../types'
import { EStacks } from '../stacks'
import { TTabsStack } from '../Tabs'

export type TMainStack = {
  //Add stack/screens ad this types for stack
  [EStacks.Tabs]: TNavigatorScreenParams<TTabsStack>

  [EScreens.WordMain]: TWordScreenParams
  [EScreens.SearchOwnTranslation]: TSearchOwnTranslationScreenProps
}
