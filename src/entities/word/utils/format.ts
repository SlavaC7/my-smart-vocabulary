import uuid from 'react-native-uuid'

import { TTranslation, TWord } from '../models'

export const formatTranslationToWord = (translation: TTranslation): TWord => {
  return {
    _id: uuid.v4(),
    text: translation.text,
    translations: translation.translations,
    voice: translation?.voice,
    examples: translation?.context?.examples,
  }
}
