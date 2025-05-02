import { useDispatch } from 'react-redux'

import { TConfiguringForm } from '@/features/test/ConfiguringForm/types'

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

  const onGenerate = (words: TWord[], config: TConfiguringForm) => {
    let configuring = words

    if (config?.type.length) {
      configuring = configuring.filter(item => config.type.includes(item.type))
    }

    if (config?.lang.length) {
      configuring = configuring.filter(item => config.lang.includes(item.code))
    }

    if (config?.folders?.length) {
      configuring = configuring.filter(item =>
        config.folders.includes(item.folderId || ''),
      )
    }

    const test: TTestItem[] = configuring.map(word => {
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
        flag: word.flag,
        type: word.type,
      }
    })

    console.log('test =>', test)

    dispatch(testsActions.setState({ test: shuffleArray(test) }))
    dispatch(testsActions.setState({ testAnswers: [] }))
  }

  return {
    onGenerate,
  }
}
