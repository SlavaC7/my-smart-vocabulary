import React, { useState } from 'react'

import { useTranslation } from 'react-i18next'

import { CountryPicker } from 'react-native-country-codes-picker'

import { useUserStore } from '@/entities/user'
import { availableLang, TAvailableLang } from '@/entities/word/utils'

import { Styled, Typography } from '@/shared'

import * as S from './styles'
import { TLangPickerProps } from './types'

export const LangPicker = ({ onChange, value, flag }: TLangPickerProps) => {
  const { t } = useTranslation()
  const { defaultLanguage, setDefaultLang } = useUserStore()
  const [visible, setVisible] = useState(false)

  const showSetDefault = value !== defaultLanguage

  const onSetDefault = () => {
    setDefaultLang(value as TAvailableLang)
  }

  return (
    <>
      <Styled.FlexWrapper flexDirection="column" align="flex-start">
        <Typography.Body2R mBottom={'8px'} color={'neutral_500'}>
          {t('own_translation.language')}
        </Typography.Body2R>

        <S.Container onPress={() => setVisible(true)}>
          <Typography.Body1R>
            {flag} {value}
          </Typography.Body1R>
        </S.Container>

        {!!showSetDefault && (
          <Styled.Touchable
            onPress={onSetDefault}
            justify="flex-start"
            mTop="16px">
            <Typography.H4 color="primary_500">
              {t('own_translation.set_lang_as_default', { value })}
            </Typography.H4>
          </Styled.Touchable>
        )}
      </Styled.FlexWrapper>

      <CountryPicker
        show={visible}
        lang={'en'}
        style={{
          modal: {
            height: 500,
          },
        }}
        showOnly={availableLang}
        pickerButtonOnPress={item => {
          console.log('item=>', item)
          onChange({
            flag: item.flag,
            value: item.code,
          })
          setVisible(false)
        }}
      />
    </>
  )
}
