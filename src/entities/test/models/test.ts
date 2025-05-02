import { EWordType } from '@/entities/word'

export type TTestItem = {
  _id: string
  word: string
  answers: TAnswer[]
  flag: string
  type: EWordType
}

export type TAnswer = {
  _id: string
  questionId: string
  text: string
  isCorrect: boolean
}

export type TConfig = {
  count: number
  folders: string[]
}
