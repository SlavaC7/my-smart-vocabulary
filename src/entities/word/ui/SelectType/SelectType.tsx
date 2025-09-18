import React from 'react'

import { Typography } from '@/shared'

import * as S from './styles'
import { TSelectTypeProps } from './types'

export const SelectType = ({
  text,
  active,
  onPress = () => {},
  ...props
}: TSelectTypeProps) => {
  return (
    <S.SelectItem onPress={onPress} active={active} {...props}>
      <Typography.Body1R color={active ? 'white' : 'black'}>
        {text}
      </Typography.Body1R>
    </S.SelectItem>
  )
}
