import { StyleSheet, TouchableOpacity } from 'react-native'

import styled from 'styled-components'

import { EColors } from '../../styled'

export const ModalContainer = styled(TouchableOpacity).attrs({
  activeOpacity: 1,
})`
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: red;
`

export const CloseButton = styled(TouchableOpacity).attrs({
  activeOpacity: 0.8,
})`
  align-self: flex-end;
`

export const styles = StyleSheet.create({
  modalView: {
    width: '100%',
    backgroundColor: EColors.white,
    borderRadius: 12,
    padding: 16,
    margin: 16,
    alignItems: 'center',
  },
})
