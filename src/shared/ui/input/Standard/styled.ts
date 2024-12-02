import { StyleSheet, View, TouchableOpacity } from 'react-native'

import MaskInput from 'react-native-mask-input'
import styled, { css } from 'styled-components'

import { FONT, MARGIN } from '../../utils'

import { TContainer, TStyledInput, TStyledInputContainer } from './types'

export const Container = styled(View)<TContainer>`
  width: ${({ width }) => width};
  align-items: flex-start;
  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.6;
    `}
  ${props => MARGIN(props)}
`
//prettier-ignore
export const StyledTextInputContainer = styled(TouchableOpacity)<
  TStyledInputContainer & { isFocused?: boolean; hideBorder?: boolean }
>`
  display: flex;
  flex-direction: row;
  align-items: ${({ multiline }) => (multiline ? 'flex-start' : 'center')};
  width: 100%;

  height: ${({ height }) => height};

  border: ${({ hideBorder }) => (hideBorder ? 0 : 1)}px solid
    ${({ theme: { COLORS } }) => COLORS.neutral_200};

  border-radius: 10px;
  background-color: ${({ theme: { COLORS } }) => COLORS.neutral_200};

  ${FONT({})}
  padding:0px 12px;

  ${({ hasError }) =>
    hasError &&
    css`
      border-color: ${({ theme: { COLORS } }) => COLORS.red_300};
    `}
`
export const StyledTextInput = styled(MaskInput)<TStyledInput>`
  ${FONT({})};
  width: 100%;
  margin-left: ${({ hasLeftIcon }) => (hasLeftIcon ? '8px' : '0px')};
  margin-right: ${({ hasRightIcon }) => (hasRightIcon ? '8px' : '0px')};
  font-size: 16px;
  padding-top: ${({ multiline }) => (multiline ? '10px' : '0px')};
  padding-bottom: ${({ multiline }) => (multiline ? '10px' : '0px')};

  color: ${({ theme: { COLORS } }) => COLORS.black};
`

export const InputContainer = styled(View)`
  flex: 1;
  flex-direction: row;
  align-items: center;
`

export const styles = StyleSheet.create({
  padding: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 4,
  },
})

export const SignsWrapper = styled(View)`
  position: absolute;
  bottom: 8px;
  right: 12px;
`

export const ErrorWrapper = styled(View)`
  position: absolute;
  bottom: -20px;
  right: 6px;
`
