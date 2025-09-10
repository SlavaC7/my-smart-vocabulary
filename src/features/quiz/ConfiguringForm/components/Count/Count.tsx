import React from 'react'

import { useTranslation } from 'react-i18next'

import { Input, Styled, Typography } from '@/shared'

import * as S from './styles'
import { TConfigFormCountProps } from './types'

const addCount = [1, 5, 10, 20]

export const Count = ({
  value = 1,
  onChange = () => {},
  error = '',
}: TConfigFormCountProps) => {
  const { t } = useTranslation()

  const _onChange = (str: string) => {
    onChange(+str.replace(/[^\d]/g, ''))
  }

  const onAddCount = (num: number) => {
    onChange(value + num)
  }

  const renderItem = (item: number, index: number) => {
    const isFirst = index === 0
    const isLast = index + 1 === addCount.length
    return (
      <S.AddCount
        key={item}
        mLeft={isFirst ? '0px' : '8px'}
        mRight={isLast ? '0px' : '8px'}
        onPress={() => onAddCount(item)}>
        <Typography.Body1R>+{item}</Typography.Body1R>
      </S.AddCount>
    )
  }

  return (
    <>
      <Typography.Body1R mBottom={'8px'} color={'neutral_600'}>
        {t('tests.count')}
      </Typography.Body1R>

      <Styled.FlexWrapper mBottom={'16px'} justify={'flex-start'}>
        <Input.Standard
          value={value + ''}
          onChange={_onChange}
          keyboardType={'numeric'}
          withClear={false}
        />
      </Styled.FlexWrapper>

      <Styled.FlexWrapper mBottom={'16px'} width={'auto'}>
        {addCount.map(renderItem)}
      </Styled.FlexWrapper>

      {!!error && (
        <Typography.Body2R mBottom={'16px'} color="red_300">
          {error}
        </Typography.Body2R>
      )}
    </>
  )
}
