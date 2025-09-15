import { useTranslation } from 'react-i18next'

import { EScreens } from '@/app/navigation'

import { useNavigation } from '@/shared'

import { TMenuItem } from './types'

export const useMenuData = () => {
  const { t } = useTranslation()
  const { navigate } = useNavigation()
  const data: TMenuItem[] = [
    {
      icon: 'UserEdit',
      title: t('profile.menu.change_profile'),
      onPress: () => {},
    },
    {
      icon: 'History',
      title: t('profile.menu.quiz_history'),
      onPress: () => navigate(EScreens.ProfileQuizHistory),
    },
    {
      icon: 'Info',
      title: t('profile.menu.about_app'),
      onPress: () => navigate(EScreens.ProfileAboutApp),
    },
  ]
  return {
    data,
  }
}
