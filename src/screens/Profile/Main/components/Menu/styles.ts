import { StyleSheet } from 'react-native'
import { View } from 'react-native'

import styled from 'styled-components'

export const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 5,

    elevation: 5,
  },
})

export const Container = styled(View).attrs({})`
  margin-top: 30px;
  background-color: ${({ theme: { COLORS } }) => COLORS.white};
  width: 100%;
  border-radius: 20px;
  padding: 10px;
`
