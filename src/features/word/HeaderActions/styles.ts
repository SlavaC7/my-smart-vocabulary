import styled from 'styled-components'

import { Styled } from '@/shared/ui/styled'
import { MARGIN, TMargin } from '@/shared/ui/utils'

export const Item = styled(Styled.Touchable)<TMargin>`
  min-width: 184px;
  align-items: center;
  justify-content: flex-start;
  padding: 6px;

  ${props => MARGIN(props)}
`
