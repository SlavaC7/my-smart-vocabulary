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
    if (activeQuiz?.status === EQuizStatus.completed) {
      setQuizState({
        activeQuiz: null,
      })
    }

    try {
      console.log('[TEST]:start')
      setLoading(true)
      const data = await QuizService.getQuizzes({
        status: EQuizStatus.in_progress,
      })

      console.log('getQuizzes =>', data.data, data.data.docs[0])

      if (data.data.docs[0]) {
        setQuizState({
          activeQuiz: data.data.docs[0],
        })
        console.log('[TEST]:docs')
      } else {
        setQuizState({
          activeQuiz: null,
        })
        console.log('[TEST]:else')
      }
    } catch (error) {
      errorHandler({
        error,
        name: 'getActiveTest',
      })
    } finally {
      console.log('[TEST]:finally')
      setLoading(false)
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
    isFocused && getAction()
  }, [isFocused])

  console.log('activeQuiz =>', activeQuiz)

  return {
    onCompleteActiveTest,
    activeQuiz,
    loading,
  }
}
