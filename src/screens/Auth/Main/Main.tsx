import React from 'react'

import { useTheme } from 'styled-components'

import { Background } from '@/shared/ui/background'

export const Main = () => {
  const { COLORS } = useTheme()

  return (
    <Background.Container top={0} bottom={0} color={COLORS.background}>
      <></>
    </Background.Container>
  )
}
