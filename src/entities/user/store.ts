import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { zustandStorage } from '@/shared'
import { EStores } from '@/shared/lib/mmkv/types'

import { TUser } from './models/common'

export type TUserStoreProps = {
  user: TUser | null
}

export type TUserStoreMethods = {
  setUser: (user: TUser | null) => void
  clear: () => void
  setUserState: (data: Partial<TUserStoreProps>) => void
}

export type TUserStore = TUserStoreProps & TUserStoreMethods

export const useUserStore = create<TUserStore>()(
  persist(
    set => ({
      user: null,
      setUser: user => set({ user }),
      clear: () =>
        set({
          user: null,
        }),
      setUserState: (store: Partial<TUserStoreProps>) => set(store),
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
