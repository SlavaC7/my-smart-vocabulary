import { useEffect, useState } from 'react'

import { useIsFocused } from '@react-navigation/native'

import { errorHandler } from '@/shared'

import { EQuizStatus } from '../models'
import { QuizService } from '../services'
import { useQuizStore } from '../store'

export const useGetActiveQuiz = () => {
  const isFocused = useIsFocused()
  const { activeQuiz, setQuizState } = useQuizStore()

  const [loading, setLoading] = useState(false)

  const getAction = async () => {
    try {
      setLoading(true)
      const data = await QuizService.getQuizzes({
        status: EQuizStatus.in_progress,
      })
      setQuizState({
        activeQuiz: data.data.docs[0] || null,
      })
    } catch (error) {
      errorHandler({
        error,
        name: 'getActiveTest',
      })
    } finally {
      setLoading(true)
    }
  }

  const onCompleteActiveTest = async () => {
    if (!activeQuiz) return

    try {
      setLoading(true)

      await QuizService.postQuizCancel({ id: activeQuiz._id })
      setQuizState({
        activeQuiz: null,
      })
    } catch (error) {
      errorHandler({
        error,
        name: 'getActiveTest',
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    isFocused && getAction
  }, [isFocused])
  return {
    onCompleteActiveTest,
    activeQuiz,
    loading,
  }
}
