import { View } from 'react-native'

import styled from 'styled-components'

export const Background = styled(View)<{ color: string }>`
  background-color: ${({ color }) => color};

  flex: 1;
`
