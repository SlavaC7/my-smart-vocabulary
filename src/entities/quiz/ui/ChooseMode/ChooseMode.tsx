import React from 'react'

import { EColors, Icon, Styled, Typography } from '@/shared'

import * as S from './styles'
import { TChooseModeProps } from './types'

export const ChooseMode = ({
  onPress = () => {},
  title = '',
  description = '',
  icon = 'Target',
  disable = false,
}: TChooseModeProps) => {
  return (
    <S.Container onPress={onPress} disabled={disable}>
      <Icon name={icon} size={40} fill={EColors.primary_500} />

      <Styled.FlexWrapper
        width="auto"
        flexDirection="column"
        align="flex-start"
        mLeft="16px">
        <Typography.H2 mBottom="5px">{title}</Typography.H2>
        <Typography.Body2R color={'neutral_600'}>
          {description}
        </Typography.Body2R>
      </Styled.FlexWrapper>
    </S.Container>
  )
}
