import { zodResolver } from '@hookform/resolvers/zod'
import { TFunction } from 'i18next'

// import { isValidPhoneNumber } from 'libphonenumber-js'
import { ZodRawShape, z } from 'zod'

import { ELanguages } from '@/app/i18n'

const numberReg = /^\d+$/

export type TSchema<TSchemaType extends z.ZodTypeAny> = z.infer<TSchemaType>

export const getSchemas = (t: TFunction<ELanguages, undefined>) => ({
  //   phone: z
  //     .string({
  //       required_error: t('errors.required'),
  //     })
  //     .min(1, t('errors.min', { value: 1 }))
  //     .refine(item => isValidPhoneNumber(item), {
  //       message: t('errors.phone'),
  //     }),

  code: z
    .string({
      required_error: t('errors.required'),
    })
    .min(1, t('errors.min', { value: 6 })),

  optionalText: z.string().optional().or(z.literal('')),

  name: z
    .string({
      required_error: t('errors.required'),
    })
    .min(1, t('errors.min', { value: 1 }))
    .max(
      255,
      t('errors.max', {
        value: 255,
      }),
    ),

  photo: z.string().min(1, t('errors.required')),

  requiredNumber: z
    .number({
      required_error: t('errors.required'),
    })
    .or(
      z
        .string({
          required_error: t('errors.required'),
        })
        .min(1, t('errors.min', { value: 1 }))
        .regex(numberReg, t('errors.integer')),
    ),
  about: z
    .string({
      required_error: t('errors.required'),
    })
    .min(1, t('errors.min', { value: 1 }))
    .max(
      500,
      t('errors.max', {
        value: 500,
      }),
    ),
  requiredString: z
    .string({
      required_error: t('errors.required'),
    })
    .min(1, t('errors.min', { value: 1 })),
  email: z
    .string({
      required_error: t('errors.required'),
    })
    .email({ message: t('errors.email') }),
  bool: z.boolean(),
})

export const validationSchema = (
  cb: (
    schemas: ReturnType<typeof getSchemas>,
    t: TFunction<ELanguages, undefined>,
  ) => ZodRawShape,
) => {
  return (t: TFunction<ELanguages, undefined>) => {
    const schemas = getSchemas(t)
    const schema = cb(schemas, t)

    return zodResolver(z.object(schema))
  }
}
