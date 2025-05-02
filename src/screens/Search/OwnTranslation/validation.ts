import { z } from 'zod'

import { EWordType } from '@/entities/word'

import { validationSchema } from '@/shared'

import { maxTranslationLenght, minTranslationLenght } from './config'

export const createOwnTranslationSchema = validationSchema(schema => ({
  word: schema.requiredString,
  translations: z
    .array(schema.requiredString)
    .min(minTranslationLenght)
    .max(maxTranslationLenght),
  type: z.enum([EWordType.word, EWordType.phrase]),
}))
