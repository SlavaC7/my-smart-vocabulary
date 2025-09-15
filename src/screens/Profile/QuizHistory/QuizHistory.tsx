import React from 'react'

import { FlatList, ListRenderItem } from 'react-native'

import { useTranslation } from 'react-i18next'

import { Header } from '@/widgets/header'

import { QuizEntity, TQuiz } from '@/entities/quiz'
import { QuizService } from '@/entities/quiz/services'

import { Background } from '@/shared'
import { useInfiniteApiQuery } from '@/shared/hooks/useApi'

export const QuizHistory = () => {
  const { t } = useTranslation()

  const {
    totalCount,
    docs: quizzesData,
    flatListProps,
    refresh,
    mutate,
  } = useInfiniteApiQuery(QuizService.getQuizzes, {
    limit: 10,

    persist: true,
  })

  const renderItem: ListRenderItem<TQuiz> = ({ item, index }) => {
    const isFirst = index === 0
    return (
      <QuizEntity.QuizHistoryItem quiz={item} mTop={isFirst ? '16px' : '0px'} />
    )
  }

  return (
    <Background.Container top={0}>
      <Header.Standard
        topInset
        hasShadow
        title={t('profile.menu.quiz_history')}
        goBack
      />
      <Background.Standard>
        <FlatList
          data={quizzesData}
          renderItem={renderItem}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          {...flatListProps}
        />
      </Background.Standard>
    </Background.Container>
  )
}
