import { StyleSheet, View } from 'react-native'

import styled from 'styled-components'

import { wp } from '@/shared'

export const BlueContainer = styled(View)`
  position: absolute;
  top: 0;
  background-color: ${({ theme: { COLORS } }) => COLORS.primary_400};
  width: ${wp(100)}px;
  height: ${wp(60)}px;

  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
`

export const styles = StyleSheet.create({
  textHi: {
    fontSize: 36,
  },
})
