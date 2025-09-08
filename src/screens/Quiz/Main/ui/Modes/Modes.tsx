import React from 'react'

import { useTranslation } from 'react-i18next'

import { EScreens } from '@/app/navigation'

import { QuizEntity, useCreateQuizzes } from '@/entities/quiz'

import { useNavigation } from '@/shared'

import { TModeQuizMainProps } from './types'

export const Modes = ({ loading, quiz }: TModeQuizMainProps) => {
  const { t } = useTranslation()
  const { navigate } = useNavigation()

  const {
    createRandomQuiz,
    createMatchRandomQuiz,
    createWritingRandomQuiz,
    onToast,
  } = useCreateQuizzes(loading, quiz)

  const onGoConfiguring = () => {
    if (loading) return

    if (!quiz) {
      navigate(EScreens.TestsConfig)

      return
    }

    if (!!quiz) {
      onToast()
    }
  }
  return (
    <>
      <QuizEntity.ChooseMode
        icon={'Settings'}
        title={t('tests.modes.config.title')}
        description={t('tests.modes.config.description')}
        onPress={onGoConfiguring}
        disable={loading}
      />
      <QuizEntity.ChooseMode
        title={t('tests.modes.match.title')}
        description={t('tests.modes.match.description')}
        onPress={createMatchRandomQuiz}
        disable={loading}
      />
      <QuizEntity.ChooseMode
        icon={'Edit'}
        title={t('tests.modes.writing.title')}
        description={t('tests.modes.writing.description')}
        onPress={createWritingRandomQuiz}
        disable={loading}
      />
      <QuizEntity.ChooseMode
        icon={'QuickClock'}
        title={t('tests.modes.quick.title')}
        description={t('tests.modes.quick.description')}
        onPress={createRandomQuiz}
        disable={loading}
      />
    </>
  )
}
