import { TUserAnswer } from '@/entities/quiz'

export type TAnswerTextProps = {
  answer: string
  haveAnswer?: TUserAnswer | undefined
  setAnswer: (value: string) => void
}
