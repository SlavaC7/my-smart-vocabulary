import { useDispatch } from 'react-redux'

import { TWord } from '@/entities/word'

import { uuid } from '@/shared'

import { TAnswer, TTestItem } from '../../models'
import { testsActions } from '../../store'

export const useGenerateTest = () => {
  const dispatch = useDispatch()

  const getRandomElement = <T>(array: T[]): T => {
    return array[Math.floor(Math.random() * array.length)]
  }

  const shuffleArray = <T>(array: T[]): T[] => {
    return [...array].sort(() => Math.random() - 0.5)
  }

  const onGenerate = (words: TWord[]) => {
    const test: TTestItem[] = words.map(word => {
      const correctTranslation = getRandomElement(word.translations)

      const otherWords = words.filter(
        w => w._id !== word._id && w.translations.length > 0,
      )

      const incorrectTranslations = shuffleArray(otherWords)
        .slice(0, 3)
        .map(w => getRandomElement(w.translations))

      const answers: TAnswer[] = shuffleArray([
        {
          _id: uuid.v4().toString(),
          questionId: word._id,
          text: correctTranslation,
          isCorrect: true,
        },
        ...incorrectTranslations.map(text => ({
          _id: uuid.v4().toString(),
          questionId: word._id,
          text,
          isCorrect: false,
        })),
      ])

      return {
        _id: word._id,
        word: word.text,
        answers,
      }
    })

    console.log('test =>', test)

    dispatch(testsActions.setState({ test }))
    dispatch(testsActions.setState({ testAnswers: [] }))
  }

  return {
    onGenerate,
  }
}
