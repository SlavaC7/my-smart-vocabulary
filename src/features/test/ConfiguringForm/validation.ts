import { z } from 'zod'

import { EWordType } from '@/entities/word'
import { availableLang } from '@/entities/word/utils'

const array = availableLang as [string, ...string[]]

export const createConfigSchema = (max: number) =>
  z.object({
    count: z.number().min(1).max(max),
    folder: z.array(z.string()).optional(),
    type: z.array(z.enum([EWordType.word, EWordType.phrase])).optional(),
    lang: z.array(z.enum(array)).optional(),
  })
