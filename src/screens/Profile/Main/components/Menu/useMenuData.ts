import { useTranslation } from 'react-i18next'

import { TMenuItem } from './types'

export const useMenuData = () => {
  const { t } = useTranslation()
  const data: TMenuItem[] = [
    {
      icon: 'UserEdit',
      title: t('profile.menu.change_profile'),
      onPress: () => {},
    },
    {
      icon: 'History',
      title: t('profile.menu.quiz_history'),
      onPress: () => {},
    },
    {
      icon: 'Info',
      title: t('profile.menu.about_app'),
      onPress: () => {},
    },
  ]
  return {
    data,
  }
}
