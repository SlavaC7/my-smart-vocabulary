import { useTranslation } from 'react-i18next'

import { EStacks } from '@/app/navigation'

import { KeysOfEStacks, TUseTabs } from './types'

export const useTabs = () => {
  const { t } = useTranslation()

  const tabs: Record<KeysOfEStacks, TUseTabs> = {
    [EStacks.Home]: {
      title: 'First page',
      Icon: 'Index',
      ActiveIcon: 'Index',
    },
    [EStacks.Main]: {
      title: '',
      Icon: 'Index',
      ActiveIcon: 'Index',
    },
  }

  return { tabs }
}
