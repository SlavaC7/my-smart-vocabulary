import React, { useCallback } from 'react'

import { useRoute } from '@react-navigation/native'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { useTheme } from 'styled-components'

import { EScreens } from '@/app/navigation'
import { TScreenQueryProps } from '@/app/navigation/types'

import { Header } from '@/widgets/header'

import { WordFeature } from '@/features'

import {
  EWordType,
  TPostWordsApi,
  useWordStore,
  WordsService,
} from '@/entities/word'

import {
  Background,
  Button,
  Icon,
  Input,
  Styled,
  useLoader,
  useNavigation,
} from '@/shared'

import { maxTranslationLenght } from './config'
import * as S from './styles'
import { TCreateOwnTranslationForm } from './types'
import { createOwnTranslationSchema } from './validation'

export const OwnTranslation = () => {
  const { COLORS } = useTheme()
  const { t } = useTranslation()
  const navigation = useNavigation()
  const { setLoading } = useLoader()
  const { setWord } = useWordStore()
  const { params } =
    useRoute<TScreenQueryProps<EScreens.SearchOwnTranslation>>()

  const isHome = !!params.isHome
  const isEdit = !!params._id

  const {
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: { isValid },
  } = useForm<TCreateOwnTranslationForm>({
    resolver: createOwnTranslationSchema(t),
    defaultValues: {
      word: params?.word || '',
      type: params?.type ? params.type : EWordType.word,
      translations: params?.translations?.length ? params.translations : [''],
      lang: params.lang || 'US',
      flag: params.flag || '🇺🇸',
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

  const onSave = async (formData: TCreateOwnTranslationForm) => {
    try {
      setLoading(true)
      const data: TPostWordsApi['payload'] = {
        ...formData,
        translations: [formData.translations[0], ...formData.translations],
        folderId: '',
      }

      console.log('Create word data:', data)

      if (isEdit) {
        const { data: newWord } = await WordsService.patchWord({
          id: params._id,
          ...data,
        })

        setWord(newWord)
        console.log('Patch word result:', newWord)
      }

      if (!isEdit) {
        const { data: newWord } = await WordsService.postWord(data)

        console.log('Post word result:', newWord)

        setWord(newWord)
      }

      navigation.goBack()
      !isHome && navigation.goBack()
    } catch (error) {
      console.error('Error create word:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Background.Container color={COLORS.neutral_200}>
      <Header.Standard
        goBack
        title={t('own_translation.title')}
        color={COLORS.neutral_200}
        rightAction={
          <Button.Text
            text={t('button.save')}
            disabled={!isValid}
            onPress={handleSubmit(onSave)}
          />
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
            <Styled.FlexWrapper>
              <Input.Standard
                label={t('own_translation.your_word')}
                inputContainerStyle={styles.inputContainer}
                style={styles.flex1}
                value={value}
                onChange={onChange}
                mBottom={'20px'}
              />
              {/* <WordFeature.SpeechToText
                mTop="22px"
                mLeft="12px"
                onChange={onChange}
              /> */}
            </Styled.FlexWrapper>
          )}
        />

        <Controller
          control={control}
          name="type"
          render={({ field: { value, onChange } }) => (
            <WordFeature.TypePicker {...{ value, onChange }} />
          )}
        />

        <Controller
          control={control}
          name="lang"
          render={({ field: { value, onChange } }) => (
            <Controller
              control={control}
              name="flag"
              render={({
                field: { value: flagValue, onChange: onChangeFlag },
              }) => (
                <WordFeature.LangPicker
                  value={value}
                  flag={flagValue}
                  onChange={item => {
                    onChange(item.value)
                    onChangeFlag(item.flag)
                  }}
                />
              )}
            />
          )}
        />

        <Controller
          control={control}
          name="translations"
          render={({ field: { value, onChange } }) => (
            <>
              {value.map((item, idx) => (
                <Styled.FlexWrapper
                  key={idx.toString()}
                  mTop="20px"
                  align="center">
                  <Styled.FlexWrapper width="auto" style={styles.flex1}>
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
                  </Styled.FlexWrapper>

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
