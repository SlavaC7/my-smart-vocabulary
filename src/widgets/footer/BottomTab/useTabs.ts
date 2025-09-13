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
    [EStacks.Tests]: {
      title: t('tests.title'),
      Icon: 'AppIconGray',
      ActiveIcon: 'AppIconWhite',
    },
    [EStacks.Profile]: {
      title: t('search.title'),
      Icon: 'User',
      ActiveIcon: 'User',
    },
  }

  return { tabs }
}
