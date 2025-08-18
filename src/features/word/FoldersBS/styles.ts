import styled from 'styled-components'

import { Styled } from '@/shared'

export const FolderWrapper = styled(Styled.Touchable)`
  width: 100%;
  border-radius: 12px;
  padding: 12px;
  background-color: ${({ theme: { COLORS } }) => COLORS.white};
  align-items: center;
  justify-content: space-between;
`
