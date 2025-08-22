import { Dimensions, StyleSheet } from 'react-native'

import styled from 'styled-components'

import { Styled } from '@/shared'

const { height, width } = Dimensions.get('window')

export const PurpleContainer = styled(Styled.FlexWrapper).attrs({
  width: `${width}px`,
  height: `${height * 0.55}px`,
})`
  z-index: -1;
  position: absolute;
  align-self: center;
  top: 0px;
  background-color: ${({ theme: { COLORS } }) => COLORS.black};
`

export const EmptyView = styled(Styled.FlexWrapper).attrs({
  width: `${width}px`,
  height: `${height * 0.45}px`,
})``

export const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
})
