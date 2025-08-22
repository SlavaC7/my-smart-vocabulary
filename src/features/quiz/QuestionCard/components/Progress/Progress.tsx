import React from 'react'

import { Indicator, ProgressContainer, Container } from './styled'
import { TProgressProps } from './types'

export const Progress = ({ count = 3, page = 1 }: TProgressProps) => {
  return (
    <Container>
      <ProgressContainer>
        <Indicator count={count} page={page} />
      </ProgressContainer>
    </Container>
  )
}
