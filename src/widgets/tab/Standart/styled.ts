import { View, TouchableOpacity, StyleSheet } from 'react-native'

import styled from 'styled-components'

import { EColors } from '@/shared/ui/styled'

export const styles = StyleSheet.create({
  shadow: {
    width: '100%',
  },
})

export const Container = styled(View)`
  flex-direction: row;
  padding-top: 11px;
  padding-bottom: 8px;
  background-color: ${EColors.white};
`

export const StyledTabButton = styled(TouchableOpacity)`
  flex: 1;
`
