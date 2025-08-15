import axios from 'axios'

import { EScreens } from '@/app/navigation'

import { UserService } from '@/entities/user/services'

import { useNavigation } from '@/shared'

export const useAuth = () => {
  const { navigate } = useNavigation()
  const auth = async () => {
    try {
      const data = await UserService.getUser()

      console.log('useAuth user =>', data)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          navigate(EScreens.AuthCreateProfile)
        }
      }
      console.log('useAuth error =>', error)
    }
  }
  return {
    auth,
  }
}
