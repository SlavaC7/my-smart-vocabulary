import { useTranslation } from 'react-i18next'

import { EStacks } from '@/app/navigation'

import { KeysOfEStacks, TUseTabs } from './types'

export const useTabs = () => {
  const { t } = useTranslation()

  const tabs: Record<KeysOfEStacks, TUseTabs> = {
    [EStacks.Home]: {
      title: t('home.title'),
      Icon: 'OpenBook',
      ActiveIcon: 'OpenBook',
    },
    [EStacks.Search]: {
      title: t('search.title'),
      Icon: 'SearchMain',
      ActiveIcon: 'SearchMain',
    },
    [EStacks.Statistics]: {
      title: t('statistics.title'),
      Icon: 'Waterfall',
      ActiveIcon: 'Waterfall',
    },
  }

  return { tabs }
}
