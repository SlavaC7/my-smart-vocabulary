import { z } from 'zod'

import { validationSchema } from '@/shared'

import { maxTranslationLenght, minTranslationLenght } from './config'

export const createOwnTranslationSchema = validationSchema(schema => ({
  word: schema.requiredString,
  translations: z
    .array(schema.requiredString)
    .min(minTranslationLenght)
    .max(maxTranslationLenght),
}))
