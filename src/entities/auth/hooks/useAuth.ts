import axios from 'axios'

import { EScreens } from '@/app/navigation'

import { useUserStore } from '@/entities/user'
import { UserService } from '@/entities/user/services'

import { useWordStore } from '@/entities/word'

import { useNavigation } from '@/shared'

export const useAuth = () => {
  const { navigate } = useNavigation()
  const { setUser } = useUserStore()
  const { updateFolders } = useWordStore()
  const auth = async () => {
    try {
      const data = await UserService.getUser()

      console.log('useAuth user =>', data)
      if (data.data) {
        updateFolders()
        setUser(data.data)
        navigate(EScreens.HomeMain)
      }
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
