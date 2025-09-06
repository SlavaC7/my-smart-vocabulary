import { TQuiz } from '@/entities/quiz'

export type TActiveQuizProps = {
  quiz: TQuiz | null
  loading: boolean
  onComplete: () => void
}
