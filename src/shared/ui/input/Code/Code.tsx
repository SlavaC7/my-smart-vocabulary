import React from 'react'

import { StyleSheet } from 'react-native'

import {
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field'

import {
  Container,
  StyledCodeField,
  StyledTextInputContainer,
  Cell,
} from './styles'
import { TPhone } from './types'

const CELL_COUNT = 6

export const Code = ({
  width = '100%',
  value = '',
  style,
  error,
  onChange,
  topComponent = null,
  inputMode,
  ...props
}: TPhone) => {
  const [propsCode, getCellOnLayoutHandler] = useClearByFocusCell({
    value: value,
    setValue: onChange,
  })

  const ref = useBlurOnFulfill({ value: value, cellCount: CELL_COUNT })

  return (
    <Container style={style} width={width} {...props}>
      {/* Input container*/}
      <StyledTextInputContainer style={styles.shadow} hasError={!!error}>
        {topComponent}

        <StyledCodeField
          ref={ref}
          {...propsCode}
          rootStyle={styles.codeFieldRoot}
          value={value}
          onChangeText={onChange}
          inputMode={inputMode}
          renderCell={({ index, symbol, isFocused }) => (
            <Cell
              hasError={!!error}
              isFocused={isFocused}
              key={index}
              onLayout={getCellOnLayoutHandler(index)}>
              {symbol || (isFocused && <Cursor />)}
            </Cell>
          )}
        />
      </StyledTextInputContainer>
    </Container>
  )
}

const styles = StyleSheet.create({
  codeFieldRoot: {
    width: '100%',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,

    elevation: 5,
  },
})
