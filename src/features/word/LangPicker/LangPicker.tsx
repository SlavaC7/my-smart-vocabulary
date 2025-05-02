import React, { useState } from 'react'

import { useTranslation } from 'react-i18next'

import { CountryPicker } from 'react-native-country-codes-picker'

import { Typography } from '@/shared'

import * as S from './styles'
import { TLangPickerProps } from './types'

export const LangPicker = ({ onChange, value, flag }: TLangPickerProps) => {
  const { t } = useTranslation()
  const [visible, setVisible] = useState(false)

  return (
    <>
      <Typography.Body2R mTop={'20px'} mBottom={'8px'} color={'neutral_500'}>
        {t('own_translation.language')}
      </Typography.Body2R>

      <S.Container onPress={() => setVisible(true)}>
        <Typography.Body1R>
          {flag} {value}
        </Typography.Body1R>
      </S.Container>

      <CountryPicker
        show={visible}
        lang={'en'}
        style={{
          modal: {
            height: 500,
          },
        }}
        showOnly={['US', 'IT']}
        pickerButtonOnPress={item => {
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
