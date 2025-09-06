import { View, TouchableOpacity, StyleSheet } from 'react-native'

import styled from 'styled-components'

import { EColors } from '@/shared/ui/styled'

export const styles = StyleSheet.create({
  shadow: {
    width: '100%',
  },
})

export const Container = styled(View)`
  padding: ${({ theme: { insets } }) => `0px 16px ${insets.bottom + 8}px 16px`};
  position: absolute;
  width: 100%;
  bottom: 0px;
`

export const TabContainer = styled(View)`
  flex-direction: row;
  background-color: ${EColors.primary_500};
  border-radius: 32px;
  padding: 8px 20px;
  width: 100%;
`

export const StyledTabButton = styled(TouchableOpacity)`
  flex: 1;
`
