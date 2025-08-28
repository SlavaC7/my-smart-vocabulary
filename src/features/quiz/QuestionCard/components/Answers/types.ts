import { TQuizItem, TUserAnswer } from '@/entities/quiz'

export type TAnswersProps = {
  answer: string
  haveAnswer?: TUserAnswer
  onPressItem?: (value: string) => void
} & Partial<Pick<TQuizItem, 'answers'>>
