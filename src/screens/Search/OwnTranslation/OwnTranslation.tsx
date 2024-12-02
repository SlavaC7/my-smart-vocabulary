import React, { useCallback } from 'react'

import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { useTheme } from 'styled-components'

import { Header } from '@/widgets/header'

import { Background, Button, Icon, Input, Styled } from '@/shared'

import { maxTranslationLenght } from './config'
import * as S from './styles'
import { TCreateOwnTranslationForm } from './types'
import { createOwnTranslationSchema } from './validation'

export const OwnTranslation = () => {
  const { COLORS } = useTheme()
  const { t } = useTranslation()

  const {
    control,
    setValue,
    getValues,
    formState: { isValid },
  } = useForm<TCreateOwnTranslationForm>({
    resolver: createOwnTranslationSchema(t),
    defaultValues: {
      word: '',
      translations: [''],
    },
  })

  const styles = S.getStyles(COLORS)

  const onPressAdd = useCallback(() => {
    const translations = getValues('translations')
    if (translations.length < maxTranslationLenght)
      setValue('translations', [...translations, ''], {
        shouldDirty: true,
        shouldValidate: true,
      })
  }, [])

  return (
    <Background.Container color={COLORS.neutral_200}>
      <Header.Standard
        goBack
        title={t('own_translation.title')}
        color={COLORS.neutral_200}
        rightAction={
          <Button.Text text={t('button.save')} disabled={!isValid} />
        }
      />

      <Background.Scroll>
        <S.LogoWrapper mTop="12px" mBottom="32px">
          <Icon name="FileDock" size={52} />
        </S.LogoWrapper>

        <Controller
          control={control}
          name="word"
          render={({ field: { value, onChange } }) => (
            <Input.Standard
              label={t('own_translation.your_word')}
              inputContainerStyle={styles.inputContainer}
              value={value}
              onChange={onChange}
            />
          )}
        />

        <Controller
          control={control}
          name="translations"
          render={({ field: { value, onChange } }) => (
            <>
              {value.map((item, idx) => (
                <Styled.FlexWrapper key={idx.toString()} mTop="20px">
                  <Input.Standard
                    style={styles.flex1}
                    label={t('own_translation.translation')}
                    inputContainerStyle={styles.inputContainer}
                    value={item}
                    onChange={e =>
                      onChange(
                        value.map((val, index) => (index === idx ? e : val)),
                      )
                    }
                  />

                  {value.length !== 1 && (
                    <Button.Text
                      mTop="22px"
                      text={t('button.remove')}
                      mLeft="12px"
                      onPress={() =>
                        onChange(value.filter((val, index) => index !== idx))
                      }
                    />
                  )}
                </Styled.FlexWrapper>
              ))}
            </>
          )}
        />

        <Controller
          control={control}
          name="translations"
          render={({ field: { value } }) => (
            <>
              {value.length !== maxTranslationLenght && (
                <Button.Standard
                  text={t('own_translation.add')}
                  type="tertiary"
                  icon="Plus"
                  mTop="12px"
                  onPress={onPressAdd}
                />
              )}
            </>
          )}
        />
      </Background.Scroll>
    </Background.Container>
  )
}
