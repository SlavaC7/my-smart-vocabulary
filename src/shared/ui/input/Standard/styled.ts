import { StyleSheet, TextInput, View } from 'react-native'

import { TouchableOpacity } from 'react-native-gesture-handler'
import styled, { css } from 'styled-components'

import { EColors } from '../../styled'
import { FONT, MARGIN } from '../../utils'

import { TContainer, TStyledInput, TStyledInputContainer } from './types'

export const Container = styled(View)<TContainer>`
  width: ${({ width }) => width};
  align-items: flex-start;
  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.7;
    `}
  ${props => MARGIN(props)}
`
//prettier-ignore
export const StyledTextInputContainer = styled(TouchableOpacity)<TStyledInputContainer>`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: ${({ height }) => height};

  border: 1px solid ${EColors.gray_999};
   
  border-radius: 10px;
  background-color: ${EColors.white};

  ${FONT({})}
  padding:0px 12px;


  ${({ hasError }) =>
    hasError &&
    css`
      border-color: ${EColors.red};
    `}


`
export const StyledTextInput = styled(TextInput)<TStyledInput>`
  margin-left: ${({ hasLeftIcon }) => (hasLeftIcon ? '11px' : '0px')};
  margin-right: ${({ hasRightIcon }) => (hasRightIcon ? '11px' : '0px')};

  ${FONT({})}
`

export const InputContainer = styled(View)`
  flex: 1;
`

export const styles = StyleSheet.create({
  padding: {
    padding: 5,
  },
})
