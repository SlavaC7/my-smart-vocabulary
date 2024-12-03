import { StyleSheet } from 'react-native'

import styled from 'styled-components'

import { appPadding, Styled } from '@/shared'

export const Container = styled(Styled.Touchable)`
  padding: 12px ${appPadding}px;
  justify-content: space-between;
`

export const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
})
