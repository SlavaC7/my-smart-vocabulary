import { View } from 'react-native'

import styled from 'styled-components'

export const SpeechContainer = styled(View)`
  padding: 8px;
  background-color: ${({ theme: { COLORS } }) => COLORS.white};
  margin-left: 12px;
  border-radius: 100px;
`
