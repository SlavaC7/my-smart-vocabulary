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
  setWord: (data: TWord) => void
}

export type TWordStore = TWordsStoreProps & TWordStoreMethods

export const useWordStore = create<TWordStore>()(
  persist(
    (set, _, state) => ({
      words: [],
      folders: [],
      clear: () =>
        set({
          words: [],
          folders: [],
        }),
      setWordState: (store: Partial<TWordsStoreProps>) => set(store),
      setWord: (word: TWord) => {
        const words = state.getState().words

        const newWords = words.filter(w => w._id !== word._id)
        set({
          words: [...newWords, word],
        })
      },
    }),
    {
      name: EStores.user,
      partialize: () => ({}),
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
)
