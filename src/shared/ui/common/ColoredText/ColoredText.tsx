import { TStyledTextProps, Typography } from '../../styled'

type TColoredTextProps = {
  TextComponent?: typeof Typography.Body1R
  highlightWords?: Array<string>
} & TStyledTextProps

export const ColoredText = ({
  TextComponent = Typography.Body1R,
  highlightWords = [],
  children = '',
  ...props
}: TColoredTextProps) => {
  const regex = new RegExp(`(${highlightWords.join('|')})`, 'gi')
  const parts = (children || '')?.split(regex)

  return (
    <TextComponent {...props}>
      {parts.map((part, index) =>
        highlightWords.some(
          word => word.toLowerCase() === part.toLowerCase(),
        ) ? (
          <TextComponent key={index} color="primary_500">
            {part}
          </TextComponent>
        ) : (
          part
        ),
      )}
    </TextComponent>
  )
}
