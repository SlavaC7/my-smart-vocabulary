import { StyleSheet, View } from 'react-native'

import styled from 'styled-components'

import { hp, wp } from '@/shared'

export const styles = StyleSheet.create({
  gradient: {
    position: 'absolute',
    top: 0,
    zIndex: 1,
    width: wp(100),
    height: hp(90),
  },
  index: {
    zIndex: 2,
  },
})

export const PaddingContainer = styled(View)`
  width: 100%;
  padding: 0 30px;
`
