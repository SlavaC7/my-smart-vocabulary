import { Text, View } from 'react-native'

import { CodeField } from 'react-native-confirmation-code-field'
import styled, { css } from 'styled-components'

import { EColors } from '../../styled'
import { FONT, MARGIN } from '../../utils'

import { TContainer, TStyledInputContainer } from './types'

export const Container = styled(View)<TContainer>`
  width: ${({ width }) => width};
  align-items: flex-start;

  ${props => MARGIN(props)}
`
//prettier-ignore
export const StyledTextInputContainer = styled(View)<TStyledInputContainer>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  padding:30px 16px;
  border-radius: 10px;
  background-color: ${EColors.white};

  ${FONT({})}

  ${({ hasError }) =>
    hasError &&
    css`
      border-color: ${EColors.red_300};
    `}

`

export const StyledCodeField = styled(CodeField).attrs({
  cellCount: 6,
  keyboardType: 'number-pad',
  textContentType: 'oneTimeCode',
})``

export const Cell = styled(Text)<{ isFocused: boolean; hasError: boolean }>`
  font-size: 24px;
  font-weight: 600;
  width: 44px;
  height: 60px;
  line-height: 58px;
  color: ${({ theme: { COLORS } }) => COLORS.black};
  background-color: ${({ theme: { COLORS }, hasError }) =>
    hasError ? COLORS.red_300 + '10' : COLORS.black};
  border-radius: 8px;
  overflow: hidden;
  text-align: center;

  ${({ isFocused, theme: { COLORS } }) =>
    isFocused &&
    css`
      border: 1px solid ${COLORS.black};
    `}
`
