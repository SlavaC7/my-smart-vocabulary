import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { zustandStorage } from '@/shared'
import { EStores } from '@/shared/lib/mmkv/types'

import { TQuiz, TUserAnswer } from './models'

export type TQuizStoreProps = {
  quizzes: TQuiz[]
  activeQuiz: TQuiz | null
}

export type TQuizStoreMethods = {
  clear: () => void
  setQuizState: (data: Partial<TQuizStoreProps>) => void
  answer: (data: TUserAnswer) => void
}

export type TQuizStore = TQuizStoreProps & TQuizStoreMethods

export const useQuizStore = create<TQuizStore>()(
  persist(
    (set, _, state) => ({
      quizzes: [],
      activeQuiz: null,
      answer: (data: TUserAnswer) => {
        const quiz = state.getState().activeQuiz

        if (quiz) {
          set({
            activeQuiz: {
              ...quiz,
              userAnswers: [...(quiz?.userAnswers || []), data],
            },
          })
        }
      },
      setQuizState: (store: Partial<TQuizStoreProps>) => set(store),
      clear: () => set({}),
    }),
    {
      name: EStores.quiz,
      partialize: state => ({
        quizzes: state.quizzes,
        activeQuiz: state.activeQuiz,
      }),
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
)
