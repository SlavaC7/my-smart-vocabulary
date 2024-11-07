import SystemNavigationBar from 'react-native-system-navigation-bar'

import { isAndroid } from '@/shared/lib'

export const useNavigationBarColorAndroid = () => {
  const changeNavigationBarColorAndroid = async (color: string) => {
    try {
      isAndroid &&
        (await SystemNavigationBar.setNavigationColor(
          color,
          'light',
          'navigation',
        ))
    } catch (e) {
      console.log('useNavigationBarColorAndroid error =>', e)
    }
  }
  return { changeNavigationBarColorAndroid }
}
