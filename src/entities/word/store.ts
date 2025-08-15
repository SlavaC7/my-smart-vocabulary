import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { zustandStorage } from '@/shared'
import { EStores } from '@/shared/lib/mmkv/types'

import { TFolder, TWord } from './models'

export type TWordsStoreProps = {
  words: TWord[]
  folders: TFolder[]
}

export type TWordStoreMethods = {
  clear: () => void
  setWordState: (data: Partial<TWordsStoreProps>) => void
}

export type TWordStore = TWordsStoreProps & TWordStoreMethods

export const useWordStore = create<TWordStore>()(
  persist(
    set => ({
      words: [],
      folders: [],
      clear: () => set({}),
      setWordState: (store: Partial<TWordsStoreProps>) => set(store),
    }),
    {
      name: EStores.user,
      partialize: () => ({}),
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
)
