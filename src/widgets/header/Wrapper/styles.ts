import { StyleSheet, View } from 'react-native'

import styled from 'styled-components'

export const Header = styled(View)`
  justify-content: center;
`

export const BarHeight = styled(View).attrs({
  pointerEvents: 'none',
})<{ height: number }>`
  height: ${({ height }) => height}px;
`

export const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
})
