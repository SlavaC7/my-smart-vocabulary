import { View, TouchableOpacity, StyleSheet } from 'react-native'

import styled from 'styled-components'

import { EColors } from '@/shared/ui/styled'

export const styles = StyleSheet.create({
  shadow: {
    width: '100%',
  },
})

export const Container = styled(View)`
  padding: 11px 16px 8px 16px;
  background-color: ${EColors.red};
`

export const TabContainer = styled(View)`
  flex-direction: row;
  background-color: ${EColors.primary};
  border-radius: 32px;
  padding: 8px 20px;
  width: 100%;
`

export const StyledTabButton = styled(TouchableOpacity)`
  flex: 1;
`
