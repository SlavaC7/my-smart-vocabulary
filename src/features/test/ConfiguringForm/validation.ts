import { z } from 'zod'

export const createConfigSchema = (max: number) =>
  z.object({
    count: z.number().min(1).max(max),
    folder: z.array(z.string()),
  })
