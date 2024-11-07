import React from 'react'

import { TIconsKeys } from '@assets/svg'

import { Icon } from '@/shared/ui/Icon'
import { EColors, Styled, Typography } from '@/shared/ui/styled'

import { Container, Title, CountContainer, styles } from './styled'

export type TTab = {
  active?: boolean
  title: string
  icon: TIconsKeys
  activeIcon: TIconsKeys
  count?: number
}

export const Tab = ({ title, icon, active, activeIcon, count }: TTab) => {
  const color = active ? EColors.primary : EColors.gray_999

  const CurrentIcon = active ? activeIcon : icon

  return (
    <>
      <Container>
        <Styled.FlexWrapper
          flexDirection={'column'}
          style={styles.main}
          width={'auto'}>
          {!!count && (
            <CountContainer>
              <Typography.CaptionR
                align={'center'}
                style={styles.text}
                color={EColors.white}>
                {count}
              </Typography.CaptionR>
            </CountContainer>
          )}

          <Icon name={CurrentIcon} size={24} fill={color} />
        </Styled.FlexWrapper>

        <Title color={color}>{title}</Title>
      </Container>
    </>
  )
}
