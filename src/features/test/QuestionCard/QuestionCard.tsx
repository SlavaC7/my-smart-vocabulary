import React from 'react'

import { View } from 'react-native'

import { EColors, Typography } from '@/shared'

import * as C from './components'
import * as S from './styled'
import { TQuestionCardProps } from './types'

export const QuestionCard = ({}: TQuestionCardProps) => {
  // const dispatch = useDispatch()
  return (
    <View style={S.styles.container}>
      <S.SVGContainer>
        <C.SvgComponent />

        {/* Content */}
        <S.ContentContainer>
          {/* <C.Progress count={totalCount} page={itemPosition} /> */}
          {/* <Icon name={'QuestionCircle'} size={56} /> */}
          <Typography.H4 style={S.styles.text} mTop={'12px'} align={'center'}>
            {/* {getTranslate(text)} */}
          </Typography.H4>
        </S.ContentContainer>
      </S.SVGContainer>

      <C.SvgComponent
        style={S.styles.backgroundLayer}
        circle={2}
        minusWidth={40}
        color={EColors.white}
      />
      <S.SmileContainer>
        {/* <Typography.H2>{emoji}</Typography.H2> */}
      </S.SmileContainer>
    </View>
  )
}
