import React from 'react'

import { useTheme } from 'styled-components'

import { Icon, Styled } from '@/shared'
import { Background } from '@/shared/ui/background'

export const Main = () => {
  const { COLORS } = useTheme()

  return (
    <Background.Container color={COLORS.background}>
      <Background.Standard>
        <Icon name={'Auth'} />
      </Background.Standard>
    </Background.Container>
  )
}
