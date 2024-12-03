import React from 'react'

import _ from 'lodash'

import { WordFeature } from '@/features/word'

import { useWordControl } from '@/entities/word'

import { Icon, Styled, Typography } from '@/shared'

import * as S from './styles'
import { TWordItemProps } from './types'

export const WordItem = ({ data, ...props }: TWordItemProps) => {
  console.log('data: ', data)
  const { existInAnyFolder } = useWordControl()

  const wordSaved = existInAnyFolder(data.text)

  const translations = data?.transaltions?.slice(1) || []

  return (
    <S.Container {...props}>
      <Styled.FlexWrapper
        width="auto"
        style={S.styles.flex1}
        justify="flex-start">
        <Icon name="GB" />

        <Typography.Body1R
          mLeft="12px"
          numberOfLines={1}
          style={S.styles.flex1}>
          {_.capitalize(data?.text || '')}

          {!!translations?.length && (
            <Typography.Body1R color="neutral_500">
              {` / ${translations.join(' • ')}`}
            </Typography.Body1R>
          )}
        </Typography.Body1R>
      </Styled.FlexWrapper>

      {!!wordSaved && (
        <Styled.FlexWrapper width="auto">
          <Icon name="DoneAll" />
        </Styled.FlexWrapper>
      )}

      {!wordSaved && <WordFeature.SaveButton word={data} variant="plus" />}
    </S.Container>
  )
}
