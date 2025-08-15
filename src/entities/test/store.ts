import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { zustandStorage } from '@/shared'
import { EStores } from '@/shared/lib/mmkv/types'

import { TAnswer, TConfig, TTestItem } from './models'

export type TQuizStoreProps = {
  config: TConfig
  test: TTestItem[]
  testAnswers: TAnswer[]

  incorrectAnswers: number
  correctAnswers: number
  totalAnswers: number
}

export type TQuizStoreMethods = {
  clear: () => void
  setQuizState: (data: Partial<TQuizStoreProps>) => void
}

export type TQuizStore = TQuizStoreProps & TQuizStoreMethods

export const useQuizStore = create<TQuizStore>()(
  persist(
    set => ({
      test: [],
      testAnswers: [],
      config: {
        count: 0,
        lang: [],
        type: [],
        folders: [],
      },

      correctAnswers: 0,
      totalAnswers: 0,
      incorrectAnswers: 0,
      clear: () => set({}),
      setQuizState: (store: Partial<TQuizStoreProps>) => set(store),
    }),
    {
      name: EStores.user,
      partialize: () => ({}),
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
)
