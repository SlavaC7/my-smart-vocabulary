import { THomeStackMainScreenParams } from '@/screens/Home/Main'

import { TSearchOwnTranslationScreenProps } from '@/screens/Search/OwnTranslation'

import { EScreens } from '../../screens'

export type THomeStack = {
  [EScreens.HomeMain]: THomeStackMainScreenParams
  [EScreens.SearchOwnTranslation]: TSearchOwnTranslationScreenProps
}
