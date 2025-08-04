import { StyleSheet, TouchableOpacity, View } from 'react-native'

import styled from 'styled-components'

import { EColors, Styled } from '@/shared'

export const CountryButton = styled(TouchableOpacity)`
  position: absolute;
  left: 0px;
  height: 100%;
  border-radius: 11px;
  width: 33%;
  align-items: center;
  z-index: 2;
`

export const ItemWrapper = styled(Styled.FlexWrapper)`
  padding: 10px 0px;
  border-bottom-width: 1px;
  border-bottom-color: ${EColors.red_100};
  justify-content: flex-start;
`

export const PhoneInputWrapper = styled(View)`
  flex: 1;
  margin-left: 5px;
`

export const styles = StyleSheet.create({
  modal: {
    height: '90%',
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  textInput: {
    height: 44,
    fontSize: 14,
    paddingLeft: 24,
    backgroundColor: EColors.red_100,

    justifyContent: 'center',
    color: EColors.neutral_600,
    alignItems: 'center',
    borderWidth: 0,
  },
  flex: {
    flex: 1,
  },
  container: {
    borderWidth: 1,
    borderColor: EColors.neutral_400,
    borderRadius: 8,
    paddingVertical: 5,
  },
})

export const countryPickerStyles = {
  modal: styles.modal,
  textInput: styles.textInput,
}
