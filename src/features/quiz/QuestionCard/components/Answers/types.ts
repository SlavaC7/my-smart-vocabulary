import { TQuiz, TQuizItem } from '@/entities/quiz'

export type TAnswersProps = {
  onPressItem?: () => void
  quizId: string
  wordId: string
} & Partial<Pick<TQuizItem, 'answers' | 'id'>> &
  Partial<Pick<TQuiz, 'userAnswers'>>
