import { TQuizItem } from '../../../entities/quiz/models'

export type TQuestionCardProps = {
  onPressItem?: () => void
  quizId: string
} & TQuizItem
