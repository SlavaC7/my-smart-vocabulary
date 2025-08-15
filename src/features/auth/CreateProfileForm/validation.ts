import { TFunction } from 'i18next'
import { z } from 'zod'

import { getSchemas } from '@/shared/lib/tools/validation'

export const createProfileFormValidation = (t: TFunction) => {
  const schemas = getSchemas(t)

  return z.object({
    name: schemas.name,
    email: schemas.optionalEmail,
  })
}
