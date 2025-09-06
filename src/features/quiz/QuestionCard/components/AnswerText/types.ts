import { TQuizItem, TUserAnswer } from '@/entities/quiz'

export type TAnswerTextProps = {
  answer: string
  haveAnswer?: TUserAnswer | undefined
  setAnswer: (value: string) => void
} & Pick<TQuizItem, 'correctWriteWord'>
