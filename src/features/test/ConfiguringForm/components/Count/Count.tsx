import React from 'react'

import { useTranslation } from 'react-i18next'

import { Input, Styled, Typography } from '@/shared'

import * as S from './styles'
import { TConfigFormCountProps } from './types'

const addCount = [1, 5, 10, 20]

export const Count = ({
  value = 1,
  onChange = () => {},
}: TConfigFormCountProps) => {
  const { t } = useTranslation()

  const _onChange = (str: string) => {
    onChange(+str.replace(/[^\d]/g, ''))
  }

  const onAddCount = (num: number) => {
    onChange(value + num)
  }

  const renderItem = (item: number) => {
    return (
      <S.AddCount key={item} onPress={() => onAddCount(item)}>
        <Typography.Body1R>+{item}</Typography.Body1R>
      </S.AddCount>
    )
  }

  return (
    <>
      <Typography.H3 mBottom={'16px'} mLeft={'10px'}>
        {t('tests.count')}
      </Typography.H3>

      <Styled.FlexWrapper justify={'flex-start'}>
        <Input.Standard
          width={'30%'}
          value={value + ''}
          onChange={_onChange}
          keyboardType={'numeric'}
          withClear={false}
        />

        <Styled.FlexWrapper width={'auto'}>
          {addCount.map(renderItem)}
        </Styled.FlexWrapper>
      </Styled.FlexWrapper>
    </>
  )
}
