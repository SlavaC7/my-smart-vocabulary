import React, { useCallback, useRef } from 'react'

import { useTheme } from 'styled-components'

import { delay } from '@/shared'
import { useNavigation } from '@/shared/hooks'
import { TPopoverRef } from '@/shared/ui/common/Popover'
import { Icon } from '@/shared/ui/Icon'
import { Styled } from '@/shared/ui/styled'

import { THeaderActionsProps } from './types'

export const HeaderActions = ({ wordId, onPressEdit }: THeaderActionsProps) => {
  const { COLORS } = useTheme()
  const popoverRef = useRef<TPopoverRef | null>(null)
  const navigation = useNavigation()

  const onPressDelete = useCallback(async () => {
    popoverRef.current?.setState({ isVisible: false })

    await delay(500)

    // dispatch(wordActions.removeWord(wordId))

    navigation.goBack()
  }, [wordId])

  return (
    <Styled.FlexWrapper width={'auto'}>
      <Styled.Touchable onPress={onPressEdit} mRight="16px" width="auto">
        <Icon name="EditDocument" />
      </Styled.Touchable>

      <Styled.Touchable onPress={onPressDelete} width="auto">
        <Icon name="Trash" stroke={COLORS.red_300} />
      </Styled.Touchable>
    </Styled.FlexWrapper>
  )
}
