import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { errorHandler, zustandStorage } from '@/shared'
import { EStores } from '@/shared/lib/mmkv/types'

import { TUser } from './models/common'
import { UserService } from './services'

export type TUserStoreProps = {
  user: TUser | null
  words: number
  folders: number
}

export type TUserStoreMethods = {
  setUser: (user: TUser | null) => void
  clear: () => void
  setUserState: (data: Partial<TUserStoreProps>) => void
  getStats: () => Promise<void>
}

export type TUserStore = TUserStoreProps & TUserStoreMethods

export const useUserStore = create<TUserStore>()(
  persist(
    set => ({
      user: null,
      words: 0,
      folders: 0,
      setUser: user => set({ user }),
      clear: () =>
        set({
          user: null,
        }),
      setUserState: (store: Partial<TUserStoreProps>) => set(store),

      getStats: async () => {
        try {
          const { data } = await UserService.getUserStats()

          set({
            words: data.words,
            folders: data.folders,
          })
        } catch (error) {
          errorHandler({
            error: error,
            name: 'deleteFolder',
          })
        }
      },
    }),
    {
      name: EStores.user,
      partialize: state => ({
        user: state.user,
      }),
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
)
