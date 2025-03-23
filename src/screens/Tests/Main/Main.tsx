import React from 'react'

import { useTranslation } from 'react-i18next'

import { useTypedSelector } from '@/app/store'

import { Header } from '@/widgets/header'

import { getTestSelector } from '@/entities/test'

import { Background, Button, EColors, Icon, Styled, Typography } from '@/shared'

import { styles } from './styles'

export const Main = () => {
  const { t } = useTranslation()
  const { correctAnswers, incorrectAnswers, totalAnswers } =
    useTypedSelector(getTestSelector)

  const correctPercent =
    !!correctAnswers && totalAnswers ? (correctAnswers / totalAnswers) * 100 : 0
  const incorrectPercent =
    !!incorrectAnswers && totalAnswers
      ? (incorrectAnswers / totalAnswers) * 100
      : 0
  return (
    <Background.Container>
      <Header.Standard goBack />
      <Background.Standard>
        <Styled.FlexWrapper flexDirection={'column'}>
          <Icon name={'Test'} size={100} />
          <Typography.H1 mTop={'16px'}>
            {t('tests.test_your_knowledge')}
          </Typography.H1>

          <Button.Standard
            width={'auto'}
            mTop={'16px'}
            text={t('button.start')}
          />
        </Styled.FlexWrapper>

        <Styled.Hr mTop={'16px'} height={6} color={EColors.neutral_200} />

        <Styled.FlexWrapper style={styles.container} flexDirection={'column'}>
          <Typography.H2 mTop={'16px'} mBottom={'20px'}>
            {t('statistics.title')}
          </Typography.H2>

          <Styled.FlexWrapper flexDirection={'column'} align={'flex-start'}>
            <Typography.H3 mBottom={'12px'}>
              {t('tests.total_answers')}:{' '}
              <Typography.H3>{totalAnswers}</Typography.H3>
            </Typography.H3>
            <Typography.H3 mBottom={'12px'}>
              {t('tests.correct_answers')}:{' '}
              <Typography.H3 color={'green_300'}>
                {correctAnswers}
              </Typography.H3>{' '}
              (
              <Typography.H3 color={'green_300'}>
                {correctPercent} %
              </Typography.H3>
              )
            </Typography.H3>
            <Typography.H3 mBottom={'12px'}>
              {t('tests.incorrect_answers')}:{' '}
              <Typography.H3 color={'red_400'}>
                {incorrectAnswers}
              </Typography.H3>{' '}
              (
              <Typography.H3 color={'red_400'}>
                {incorrectPercent} %
              </Typography.H3>
              )
            </Typography.H3>
          </Styled.FlexWrapper>
        </Styled.FlexWrapper>
      </Background.Standard>
    </Background.Container>
  )
}
