import { format, formatRelative, Locale, parseISO } from 'date-fns'
import { cs } from 'date-fns/locale'
import _ from 'lodash'

import { ELanguages, i18n } from '@/app/i18n'

export const dateLocale: Record<string, Locale> = {
  [ELanguages.en]: {
    ...cs,
  },
}

export const formatLocale = (
  date: string | number | undefined,
  formatter = 'dd MMM yyyy',
) => {
  if (!date) {
    return ''
  }

  const currentDate = _.isString(date) ? parseISO(date) : date
  return format(currentDate, formatter, {
    locale: dateLocale[i18n.language],
  })
}

export const formatRelativeLocale = (date: string | number) => {
  const currentDate = _.isString(date) ? parseISO(date) : date
  return formatRelative(currentDate, new Date(), {
    locale: dateLocale[i18n.language],
  })
}
