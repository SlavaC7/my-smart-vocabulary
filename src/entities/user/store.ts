import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { errorHandler, zustandStorage } from '@/shared'
import { EStores } from '@/shared/lib/mmkv/types'

import { TAvailableLang } from '../word/utils'

import { TUser } from './models/common'
import { UserService } from './services'

export type TUserStoreProps = {
  user: TUser | null
  words: number
  folders: number
  defaultLanguage: null | TAvailableLang
  recentlyLangUsed: TAvailableLang[]
}

export type TUserStoreMethods = {
  setUser: (user: TUser | null) => void
  clear: () => void
  setUserState: (data: Partial<TUserStoreProps>) => void
  getStats: () => Promise<void>
  setRecentlyLangUsed: (lang: TAvailableLang) => void
  setDefaultLang: (lang: TAvailableLang) => void
}

export type TUserStore = TUserStoreProps & TUserStoreMethods

export const useUserStore = create<TUserStore>()(
  persist(
    (set, _, state) => ({
      user: null,
      words: 0,
      folders: 0,
      defaultLanguage: null,
      recentlyLangUsed: [],
      setUser: user => set({ user }),
      setDefaultLang: (lang: TAvailableLang) => {
        set({
          defaultLanguage: lang,
        })
      },

      setRecentlyLangUsed: (lang: TAvailableLang) => {
        const langArr = state.getState().recentlyLangUsed
        if (langArr.length === 3) return
        if (langArr.includes(lang)) {
          const filtered = langArr.filter(el => el !== lang)
          set({
            recentlyLangUsed: [lang, ...filtered],
          })
          return
        }

        set({
          recentlyLangUsed: [lang, ...langArr],
        })
      },
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
