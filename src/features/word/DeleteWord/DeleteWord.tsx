import React from 'react'

import { WordsService } from '@/entities/word'

import { errorHandler, Icon } from '@/shared'

import { Container } from './styles'
import { TDeleteWordProps } from './types'

export const DeleteWord = ({ id: wordId, onDelete }: TDeleteWordProps) => {
  const _onDelete = async () => {
    try {
      if (!wordId) return

      await WordsService.deleteWord({ id: wordId })

      if (onDelete) {
        onDelete()
        return
      }
    } catch (error) {
      errorHandler({
        error: error,
        name: 'deleteWord',
      })
    }
  }
  return (
    <Container onPress={_onDelete}>
      <Icon name={'Trash'} />
    </Container>
  )
}
