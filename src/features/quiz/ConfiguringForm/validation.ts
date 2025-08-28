import { z } from 'zod'

import { EQuizItemMode } from '@/entities/quiz'
import { EWordType } from '@/entities/word'
import { availableLang } from '@/entities/word/utils'

const array = availableLang as [string, ...string[]]

export const createConfigSchema = (max: number) =>
  z.object({
    count: z.number().min(1).max(max),
    folders: z
      .array(
        z.object({
          _id: z.string(),
          count: z.number(),
          createdAt: z.string(),
          name: z.string(),
          ownerUid: z.string(),
          updatedAt: z.string(),
        }),
      )
      .optional(),
    type: z.array(z.enum([EWordType.word, EWordType.phrase])).optional(),
    lang: z.array(z.enum(array)).optional(),
    mode: z
      .array(z.enum([EQuizItemMode.match, EQuizItemMode.write_word]))
      .optional(),
  })
