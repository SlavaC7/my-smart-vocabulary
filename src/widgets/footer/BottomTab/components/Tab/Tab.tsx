import React from 'react'

import { useTheme } from 'styled-components'

import { TIconsKeys } from '@assets/svg'

import { Icon } from '@/shared/ui/Icon'
import { Styled, Typography } from '@/shared/ui/styled'

import { Container, Title, CountContainer, styles } from './styles'

export type TTab = {
  active?: boolean
  title: string
  icon: TIconsKeys
  activeIcon: TIconsKeys
  count?: number
}

export const Tab = ({ title, icon, active, activeIcon, count }: TTab) => {
  const { COLORS } = useTheme()
  const color = active ? COLORS.white : COLORS.neutral_300

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
              <Typography.Caption1R
                align={'center'}
                style={styles.text}
                color="white">
                {count}
              </Typography.Caption1R>
            </CountContainer>
          )}

          <Icon
            name={CurrentIcon}
            size={24}
            fill={color}
            stroke={activeIcon === 'Waterfall' ? color : undefined}
          />
        </Styled.FlexWrapper>

        <Title color={color}>{title}</Title>
      </Container>
    </>
  )
}
