import Toast from 'react-native-toast-message'

import { EScreens } from '@/app/navigation'

import { errorHandler, useLoader, useNavigation } from '@/shared'

import { EQuizItemMode, TQuiz } from '../models'
import { QuizService } from '../services'
import { useQuizStore } from '../store'

export const useCreateQuizzes = (loading: boolean, quiz: boolean) => {
  const { setLoading } = useLoader()
  const { setQuizState } = useQuizStore()
  const { navigate } = useNavigation()
  const createQuiz = async (mode: EQuizItemMode[]) => {
    return QuizService.postCreateQuiz({
      mode,
      count: 10,
    })
  }
  const onToast = () => {
    Toast.show({
      type: 'info',
      text1: 'toasts.ops',
      text2: 'toasts.exist_quiz',
    })
  }

  const onNavigateToQuiz = (newQuiz: TQuiz) => {
    setQuizState({
      activeQuiz: newQuiz,
    })

    navigate(EScreens.TestsQuestion)
  }

  const createMatchRandomQuiz = async () => {
    if (loading) return

    if (quiz) {
      onToast()
      return
    }

    try {
      setLoading(true)
      const { data } = await createQuiz([EQuizItemMode.match])

      onNavigateToQuiz(data)
    } catch (error) {
      errorHandler({ error })
    } finally {
      setLoading(false)
    }
  }

  const createWritingRandomQuiz = async () => {
    if (loading) return

    if (quiz) {
      onToast()
      return
    }

    try {
      setLoading(true)

      const { data } = await createQuiz([EQuizItemMode.write_word])

      onNavigateToQuiz(data)
    } catch (error) {
      errorHandler({ error })
    } finally {
      setLoading(false)
    }
  }

  const createRandomQuiz = async () => {
    if (loading) return

    if (quiz) {
      onToast()
      return
    }

    try {
      setLoading(true)

      const { data } = await createQuiz([
        EQuizItemMode.write_word,
        EQuizItemMode.match,
      ])

      onNavigateToQuiz(data)
    } catch (error) {
      errorHandler({ error })
    } finally {
      setLoading(false)
    }
  }

  return {
    createMatchRandomQuiz,
    createWritingRandomQuiz,
    createRandomQuiz,
    onToast,
  }
}
