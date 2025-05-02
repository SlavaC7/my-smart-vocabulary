import { TSearchOwnTranslationScreenProps } from '@/screens/Search/OwnTranslation'

import { EScreens } from '../../screens'

export type TSearchStack = {
  [EScreens.SearchMain]: undefined
  [EScreens.SearchOwnTranslation]: TSearchOwnTranslationScreenProps
}
