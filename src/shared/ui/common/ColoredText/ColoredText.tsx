import React from 'react'

import { TStyledTextProps, Typography } from '../../styled'

type TColoredTextProps = {
  TextComponent?: typeof Typography.Body1R
  highlightWords?: Array<string>
  children: string
} & TStyledTextProps

export const ColoredText = ({
  TextComponent = Typography.Body1R,
  highlightWords = [],
  children = '',
  ...props
}: TColoredTextProps) => {
  const regex = new RegExp(`(${highlightWords.join('|')})`, 'gi')
  const parts = (children || '')?.split(regex)

  const renderItem = (part: string, index: number) => {
    const isHightLight = highlightWords.some(
      word => word.toLowerCase() === part.toLowerCase(),
    )

    if (isHightLight) {
      return (
        <TextComponent key={index} color="primary_500">
          {part}
        </TextComponent>
      )
    }
    return part
  }

  return <TextComponent {...props}>{parts.map(renderItem)}</TextComponent>
}
