import React, { useEffect } from 'react'

import { useIsFocused } from '@react-navigation/native'

import { useTranslation } from 'react-i18next'

import { useUserStore } from '@/entities/user'

import { Background, Styled, Typography } from '@/shared'

import * as C from './components'
import { BlueContainer, styles } from './styles'

export const Main = () => {
  const { t } = useTranslation()
  const { user, words, folders, getStats } = useUserStore()
  const isFocused = useIsFocused()

  useEffect(() => {
    isFocused && getStats()
  }, [isFocused])

  return (
    <Background.Container>
      <BlueContainer />

      <Background.Standard pHorizontal={20}>
        <Typography.H1 mTop={'20px'} color={'white'} style={styles.textHi}>
          Hi, {user?.name}
        </Typography.H1>

        <Styled.FlexWrapper mTop={'24px'}>
          <Typography.Body1R color={'white'} mRight={'16px'}>
            {t('profile.total_words')}:{' '}
            <Typography.H3 color={'white'}>{words}</Typography.H3>
          </Typography.Body1R>
          <Typography.Body1R color={'white'}>
            {t('profile.total_folders')}:{' '}
            <Typography.H3 color={'white'}>{folders}</Typography.H3>
          </Typography.Body1R>
        </Styled.FlexWrapper>

        <C.Menu />
      </Background.Standard>
    </Background.Container>
  )
}
