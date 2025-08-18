import styled from 'styled-components'

import { Styled } from '@/shared'

export const FolderWrapper = styled(Styled.Touchable)`
  border-radius: 12px;
  padding: 12px;
  background-color: ${({ theme: { COLORS } }) => COLORS.white};
  align-items: center;
  justify-content: space-between;
`
