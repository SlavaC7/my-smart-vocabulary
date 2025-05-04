import React from 'react'

import { useDispatch } from 'react-redux'

import { wordActions } from '@/entities/word'

import { Icon } from '@/shared'

import { Container } from './styles'
import { TDeleteWordProps } from './types'

export const DeleteWord = ({ id: wordId, onDelete }: TDeleteWordProps) => {
  const dispatch = useDispatch()

  const _onDelete = () => {
    if (onDelete) {
      onDelete()
      return
    }
    if (!wordId) return
    dispatch(wordActions.removeWord(wordId))
  }
  return (
    <Container onPress={_onDelete}>
      <Icon name={'Trash'} />
    </Container>
  )
}
