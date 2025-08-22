import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { zustandStorage } from '@/shared'
import { EStores } from '@/shared/lib/mmkv/types'

import { TQuiz } from './models'

export type TQuizStoreProps = {
  quizzes: TQuiz[]
  activeQuiz: TQuiz | null
}

export type TQuizStoreMethods = {
  clear: () => void
  setQuizState: (data: Partial<TQuizStoreProps>) => void
}

export type TQuizStore = TQuizStoreProps & TQuizStoreMethods

export const useQuizStore = create<TQuizStore>()(
  persist(
    set => ({
      quizzes: [],
      activeQuiz: null,
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
