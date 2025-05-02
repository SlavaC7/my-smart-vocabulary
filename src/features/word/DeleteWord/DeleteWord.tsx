import React from 'react'

import { useDispatch } from 'react-redux'

import { wordActions } from '@/entities/word'

import { Icon } from '@/shared'

import { Container } from './styles'
import { TDeleteWordProps } from './types'

export const DeleteWord = ({ id: wordId }: TDeleteWordProps) => {
  const dispatch = useDispatch()
  const onDelete = () => {
    dispatch(wordActions.removeWord(wordId))
  }
  return (
    <Container onPress={onDelete}>
      <Icon name={'Trash'} />
    </Container>
  )
}
