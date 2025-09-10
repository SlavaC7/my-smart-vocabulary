import React from 'react'

import * as S from './styles'

import { TProgressProps } from './types'

export const Progress = ({ width, total, count }: TProgressProps) => {
  const lineProgress = (width / total) * count
  return (
    <S.Line width={width} color={'white'}>
      <S.Line width={lineProgress} color={'primary_600'} />
    </S.Line>
  )
}
