import { EWordType } from '@/entities/word'
import { TAvailableLang } from '@/entities/word/utils'

export type TTestItem = {
  _id: string
  wordId: string
  word: string
  answers: TAnswer[]
  flag: string
  type: EWordType
}

export type TAnswer = {
  _id: string
  text: string
  isCorrect: boolean
}

export type TQuiz = {
  _id: string
  quiz: TTestItem[]
  userAnswers: string[] //answers._id
  correct: number
  incorrect: number
  status: 'in_progress' | 'completed' | 'canceled'
  createdAt: string
  completedAt: string
}
