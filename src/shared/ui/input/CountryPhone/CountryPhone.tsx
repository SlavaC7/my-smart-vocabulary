import React, { useEffect, useState } from 'react'

import { TouchableOpacity } from 'react-native'

import i18next from 'i18next'
import {
  CountryCode,
  getExampleNumber,
  parsePhoneNumber,
} from 'libphonenumber-js'
import examples from 'libphonenumber-js/mobile/examples'

import { useTranslation } from 'react-i18next'
import {
  CountryPicker,
  CountryItem,
  ItemTemplateProps,
  countryCodes,
} from 'react-native-country-codes-picker'

import { Typography } from '../../styled'
import { FlexWrapper } from '../../styled/Styled'
import { Standard } from '../Standard'

import { initialCountry } from './config'
import {
  CountryButton,
  countryPickerStyles,
  ItemWrapper,
  PhoneInputWrapper,
  styles,
} from './styles'
import { TCountryPhoneProps } from './types'

export const CountryPhone = ({
  onChange = () => {},
  value = '',
  error,
  disabled = false,
  inputProps = {},
  placeholder,
  ...props
}: TCountryPhoneProps) => {
  const { t } = useTranslation()
  const [show, setShow] = useState(false)
  const [localValue, setLocalValue] = useState<string>('')
  const [countryLocal, setCountryLocal] = useState<null | CountryItem>(
    initialCountry,
  )

  const [inputMask, setInputMask] = useState<Array<string | RegExp>>([])

  useEffect(() => {
    const getExample = async () => {
      if (!!countryLocal?.code) {
        try {
          const exampleNumber = getExampleNumber(
            countryLocal?.code as CountryCode,
            examples,
          )
          if (exampleNumber) {
            const internationalPhoneNumber = exampleNumber.formatInternational()

            const onlyNationalNumber = internationalPhoneNumber.split(
              `+${exampleNumber.countryCallingCode} `,
            )[1]
            // setMaxLength(onlyNationalNumber.replace(/\D/g, '').length)

            // const operatorSection = onlyNationalNumber.split(' ')[0]

            const arr: Array<string | RegExp> = []

            onlyNationalNumber.split('').map(item => {
              // if (index === 0) {
              //   arr.push('(', /\d/)
              //   return
              // }
              // if (index === operatorSection.length) {
              //   arr.push(')', ' ')
              //   return
              // }
              if (item === ' ') {
                arr.push(' ')
                return
              } else {
                arr.push(/\d/)
              }
            })
            setInputMask(arr)
          }
        } catch {}
      }
    }

    getExample()
  }, [countryLocal])

  useEffect(() => {
    try {
      if (value) {
        const phoneNumber = parsePhoneNumber(value)
        if (phoneNumber) {
          setLocalValue(phoneNumber.nationalNumber)
          const lCountry = countryCodes.find(
            item => item.code === phoneNumber?.country,
          )
          lCountry && setCountryLocal(lCountry)
        }
      }
    } catch (e) {
      console.log(e)
    }
  }, [value])

  useEffect(() => {
    if (localValue && countryLocal?.dial_code) {
      onChange?.(countryLocal.dial_code + localValue)
    } else {
      onChange?.('')
    }
  }, [localValue, countryLocal?.dial_code])

  const renderItem = (item: ItemTemplateProps) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setCountryLocal(item.item)
          setShow(false)
        }}>
        <ItemWrapper justify="flex-start">
          <Typography.H1>{item.item.flag}</Typography.H1>
          <Typography.Body1R mLeft="12px" style={styles.flex}>
            {item.name}{' '}
            <Typography.Body1R>({item.item.dial_code})</Typography.Body1R>
          </Typography.Body1R>
        </ItemWrapper>
      </TouchableOpacity>
    )
  }

  const countryButtonWidth = !!countryLocal?.dial_code.length
    ? `${105 + countryLocal?.dial_code.length * 5}px`
    : '130px'

  console.log('countryLocal =>', countryLocal)

  return (
    <FlexWrapper {...props} flexDirection="column" align="flex-start">
      <FlexWrapper
        style={styles.container}
        justify="space-between"
        align="flex-start">
        <Standard
          error={error}
          width={countryButtonWidth}
          value={`${countryLocal?.flag} ${countryLocal?.dial_code}`}
          // rightIcon="ArrowDown"
          withClear={false}
          rightIconProps={{
            size: 18,
          }}
          disabled={disabled}
        />
        <CountryButton onPress={() => (disabled ? () => {} : setShow(true))} />
        <PhoneInputWrapper>
          <Standard
            {...inputProps}
            keyboardType="number-pad"
            disabled={disabled}
            isError={!!error}
            // error={!!error}
            value={localValue}
            onChange={setLocalValue}
            mask={inputMask}
            hideBorder
            withClear={false}
            placeholder={placeholder || t('auth.phone_placeholder')}
          />
        </PhoneInputWrapper>
      </FlexWrapper>

      <CountryPicker
        style={countryPickerStyles}
        pickerButtonOnPress={() => {}}
        lang={i18next.language === 'uk' ? 'ua' : i18next.language}
        show={show}
        itemTemplate={renderItem}
        inputPlaceholder={t('inputs.search')}
        onBackdropPress={() => setShow(false)}
        // inputPlaceholderTextColor={EColors.placeholder}
      />
    </FlexWrapper>
  )
}
