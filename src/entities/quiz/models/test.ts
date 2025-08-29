import { EWordType } from '@/entities/word'

export enum EQuizItemMode {
  multiple_choice = 'multiple_choice',
  write_word = 'write_word',
  match = 'match',
}

export enum EQuizStatus {
  in_progress = 'in_progress',
  completed = 'completed',
  canceled = 'canceled',
}

export type TAnswer = {
  id: string
  text: string
  isCorrect: boolean
}

export type TUserAnswer = {
  questionId: string
  answerId?: string
  answerText?: string
  correctText?: string
  isCorrect: boolean
  answeredAt: string
}

export type TQuizItem = {
  id: string
  wordId: string
  word: string
  correctWriteWord?: string[]
  answers: TAnswer[]
  flag: string
  type: EWordType
  mode: EQuizItemMode
}

export type TQuiz = {
  _id: string
  ownerUid: string
  quiz: TQuizItem[]
  userAnswers: TUserAnswer[]
  correct: number
  incorrect: number
  status: EQuizStatus
  config: {
    count: number
    folders: string[]
    type: EWordType[]
    lang: string[]
    weakWords: boolean
    mode: EQuizItemMode
  }
  createdAt: string
  updatedAt: string
}
