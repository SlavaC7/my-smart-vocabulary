import React, { useCallback, useRef } from 'react'

import { TextInput } from 'react-native'

import { useTranslation } from 'react-i18next'
import { TouchableOpacity } from 'react-native-gesture-handler'

import { useTheme } from 'styled-components'

import { useBottomSheetKeyboard } from '@/shared/hooks'

import { Icon } from '../../Icon'
import { Styled, Typography } from '../../styled'

import {
  Container,
  ErrorWrapper,
  InputContainer,
  StyledTextInput,
  StyledTextInputContainer,
  styles,
} from './styled'
import { TStandardInputProps } from './types'

export const Standard = ({
  width = '100%',
  height = '36px',
  value = '',
  style,
  placeholder,
  error = '',
  leftIcon,
  rightIcon,
  leftIconProps = {},
  rightIconProps = {},
  onChange,
  onPressRightIcon,
  disabled = false,
  onPress,
  multiline = false,
  inputContainerStyle = {},
  autoFocus = false,
  onSubmitEditing = () => {},
  withoutDisabledStyles = false,
  mask,
  editable = true,
  isError = false,
  maxSigns,
  rightAction,
  leftAction,
  maxLength,
  label,
  topLabelAction,
  inputProps = {},
  hideBorder = true,
  inputStyle = {},
  keyboardType,
  onBlur,
  onFocus,
  isBottomSheet = false,
  withClear = true,
  ...props
}: TStandardInputProps) => {
  const inputRef = useRef<TextInput | null>(null)
  const { COLORS } = useTheme()
  const { keys, t } = useTranslation()
  const {
    onBlur: onBottomSheetBlur,
    onFocus: onBottomSheetFocus,
    isFocused,
  } = useBottomSheetKeyboard({
    isBottomSheet,
  })

  const _onPress = useCallback(() => {
    if (onPress) {
      onPress()
      return
    }
    inputRef.current?.focus()
  }, [])

  return (
    <Container
      disabled={!withoutDisabledStyles ? disabled : false}
      style={style}
      width={width}
      {...props}>
      {/* Input container*/}

      {!!label && (
        <Styled.FlexWrapper justify="space-between">
          <Typography.Body2R mBottom="8px" color="neutral_500">
            {label}
          </Typography.Body2R>

          {topLabelAction}
        </Styled.FlexWrapper>
      )}

      <StyledTextInputContainer
        multiline={!!multiline}
        disabled={disabled}
        isFocused={isFocused}
        onPress={_onPress}
        height={height}
        activeOpacity={1}
        style={inputContainerStyle}
        hideBorder={hideBorder}
        hasError={!!error || isError}>
        {/*  Left icon*/}
        {!!leftIcon && <Icon name={leftIcon} {...leftIconProps} />}
        {leftAction}

        <InputContainer pointerEvents={onPress ? 'none' : 'auto'}>
          {/* Input */}

          <StyledTextInput
            ref={inputRef}
            mask={mask}
            style={[{}, inputStyle]}
            placeholder={!value?.length ? placeholder : ''}
            textAlignVertical={'center'}
            placeholderTextColor={COLORS.placeholder_light}
            value={value}
            editable={!disabled && editable}
            hasLeftIcon={!!leftIcon || !!leftAction}
            hasRightIcon={!!rightIcon || !!rightAction}
            onChangeText={onChange}
            multiline={multiline}
            onSubmitEditing={onSubmitEditing}
            autoFocus={autoFocus}
            onFocus={() => {
              onFocus?.()
              onBottomSheetFocus()
            }}
            keyboardType={keyboardType}
            onBlur={() => {
              onBlur?.()
              onBottomSheetBlur()
            }}
            cursorColor={COLORS.neutral_300}
            maxLength={maxLength || maxSigns}
            {...inputProps}
          />
        </InputContainer>

        {/* Right icon */}
        {!!rightIcon && (
          <TouchableOpacity
            style={styles.padding}
            onPress={onPressRightIcon}
            activeOpacity={onPressRightIcon ? 0.8 : 1}>
            <Icon
              name={rightIcon}
              fill={COLORS.neutral_700}
              {...rightIconProps}
            />
          </TouchableOpacity>
        )}

        {!!withClear && (
          <TouchableOpacity
            style={styles.padding}
            onPress={() => onChange?.('', '', '')}
            activeOpacity={0.8}>
            <Icon name="CloseFilled" fill={COLORS.neutral_700} size={18} />
          </TouchableOpacity>
        )}
        {rightAction}

        {/* {!!maxSigns && (
          <SignsWrapper>
            <Typography.Caption1R color="neutral_500">{`${
              value?.length || 0
            } / ${maxSigns}`}</Typography.Caption1R>
          </SignsWrapper>
        )} */}
      </StyledTextInputContainer>

      {!!error && (
        <ErrorWrapper>
          <Typography.Body2R color="red_300">
            {t(error as keyof typeof keys)}
          </Typography.Body2R>
        </ErrorWrapper>
      )}
    </Container>
  )
}
