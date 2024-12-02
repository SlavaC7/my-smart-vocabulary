// styled.d.ts
import 'styled-components'
import { EdgeInsets } from 'react-native-safe-area-context'

import { EColors } from '@/shared/ui/styled'

import { TShadows } from '../contexts/Theme'

declare module 'styled-components' {
  export interface DefaultTheme {
    COLORS: typeof EColors
    SHADOWS: TShadows
    insets: EdgeInsets
  }
}
