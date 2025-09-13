import React from 'react'

import { MenuItem } from '../MenuItem'

import * as S from './styles'
import { TMenuItem } from './types'
import { useMenuData } from './useMenuData'

export const Menu = () => {
  const { data } = useMenuData()

  const renderItem = (item: TMenuItem, index: number) => {
    const isLast = index === data.length - 1
    return <MenuItem key={item.title} {...item} isLast={isLast} />
  }
  return (
    <S.Container style={S.styles.shadow}>{data.map(renderItem)}</S.Container>
  )
}
