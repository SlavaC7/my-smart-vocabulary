import { View } from 'react-native'

import styled from 'styled-components'

import { appPadding, MARGIN, TMargin } from '@/shared'

export const TitleSection = styled(View)<TMargin>`
  padding: 8px ${appPadding}px;
  background-color: ${({ theme: { COLORS } }) => COLORS.neutral_200};
  ${props => MARGIN(props)};
`
