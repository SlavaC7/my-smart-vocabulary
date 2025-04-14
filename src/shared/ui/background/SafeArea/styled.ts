import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components'

import { TEColors } from '../../styled'

export const BackgroundSafeArea = styled(SafeAreaView)<{ color: TEColors }>`
  background-color: ${({ color, theme: { COLORS } }) => COLORS[color]};

  flex: 1;
`
