import React, { useEffect, useState } from 'react'

import { useTranslation } from 'react-i18next'

import { TouchableOpacity } from 'react-native-gesture-handler'

import { EColors, Typography } from '../../styled'

import {
  Container,
  StyledTextInputContainer,
  StyledTextInput,
  InputContainer,
  styles,
} from './styled'
import { TStandard } from './types'

const NEUTRAL_COLOR = EColors.gray_999

export const Standard = ({
  label = '',
  width = '100%',
  height = '50px',
  value = '',
  style,
  notRequired,
  placeholder,
  error,
  RightIcon,
  LeftIcon,
  leftIconProps,
  rightIconProps,
  onChange,
  onPressRightIcon,
  disabled = false,
  onPress,
  keyboardType = 'default',
  multiline = false,
  inputContainerStyle = {},
  autoFocus = false,
  onSubmitEditing = () => {},
  autoComplete,
  ...props
}: TStandard) => {
  const [inputValue, setInputValue] = useState<string>(value)

  const { t } = useTranslation()

  const onValueChange = (changeValue: string) => {
    onChange && onChange(changeValue)
    setInputValue(changeValue)
  }

  useEffect(() => {
    setInputValue(value)
  }, [value])

  return (
    <Container disabled={disabled} style={style} width={width} {...props}>
      {/* Label */}
      {label && (
        <Typography.Body2SB mLeft={'10px'} mBottom={'12px'}>
          {label}
          <Typography.Body2SB color={EColors.primary}>
            {!notRequired && '*'}
          </Typography.Body2SB>
        </Typography.Body2SB>
      )}

      {/* Input container*/}
      <StyledTextInputContainer
        disabled={disabled}
        onPress={onPress}
        height={height}
        activeOpacity={1}
        style={inputContainerStyle}
        hasError={!!error}>
        {/*  Left icon*/}
        {!!LeftIcon && <LeftIcon fill={NEUTRAL_COLOR} {...leftIconProps} />}

        <InputContainer>
          {/* Input */}

          <StyledTextInput
            placeholder={placeholder}
            placeholderTextColor={NEUTRAL_COLOR}
            value={inputValue}
            editable={!disabled}
            hasLeftIcon={!!LeftIcon}
            hasRightIcon={!!RightIcon}
            onChangeText={onValueChange}
            keyboardType={keyboardType}
            multiline={multiline}
            onSubmitEditing={onSubmitEditing}
            autoFocus={autoFocus}
            autoComplete={autoComplete}
          />
        </InputContainer>

        {/* Right icon */}
        {!!RightIcon && (
          <TouchableOpacity style={styles.padding} onPress={onPressRightIcon}>
            <RightIcon fill={NEUTRAL_COLOR} {...rightIconProps} />
          </TouchableOpacity>
        )}
      </StyledTextInputContainer>

      {error && (
        <Typography.Body2R
          mTop={'10px'}
          mLeft={'8px'}
          mBottom={'10px'}
          color={EColors.red}>
          {t(`${error}`)}
        </Typography.Body2R>
      )}
    </Container>
  )
}
