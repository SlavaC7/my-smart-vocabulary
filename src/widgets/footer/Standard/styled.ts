import { View } from 'react-native'

import styled from 'styled-components'

import { appPadding } from '@/shared'
import { FLEX } from '@/shared/ui/utils'

export const ContentContainer = styled(View)<{ bottomInst: number }>`
  width: 100%;
  padding: 0px ${appPadding}px;
  background-color: ${({ theme: { COLORS } }) => COLORS.white};
  padding-bottom: ${({ bottomInst }) => bottomInst + 10}px;
  ${FLEX({ direction: 'row', align: 'center', justify: 'space-between' })}
`
