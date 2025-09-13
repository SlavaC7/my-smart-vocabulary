import React from 'react'

import { EColors, Icon, Styled, Typography } from '@/shared'

import * as S from './styles'
import { TMenuItemProps } from './types'

export const MenuItem = ({ isLast, title, onPress, icon }: TMenuItemProps) => {
  return (
    <S.Container isLast={isLast} onPress={onPress}>
      <Styled.FlexWrapper width="auto">
        <Icon name={icon} fill={EColors.neutral_600} />
        <Typography.Body1R mLeft={'10px'} color={'neutral_600'}>
          {title}
        </Typography.Body1R>
      </Styled.FlexWrapper>

      <Icon name={'AngleArrowRight'} />
    </S.Container>
  )
}
