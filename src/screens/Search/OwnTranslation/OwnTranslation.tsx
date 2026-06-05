import React, { useCallback } from 'react'

import { useRoute } from '@react-navigation/native'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { countryCodes } from 'react-native-country-codes-picker'
import { useTheme } from 'styled-components'

import { EScreens } from '@/app/navigation'
import { TScreenQueryProps } from '@/app/navigation/types'

import { Header } from '@/widgets/header'

import { WordFeature } from '@/features'

import { useUserStore } from '@/entities/user'
import {
  EWordType,
  TPostWordsApi,
  useWordStore,
  WordsService,
} from '@/entities/word'

import {
  Background,
  Button,
  errorHandler,
  getFlag,
  Input,
  Styled,
  Typography,
  useLoader,
  useNavigation,
} from '@/shared'

import { maxTranslationLenght } from './config'
import * as S from './styles'
import { TCreateOwnTranslationForm } from './types'
import { createOwnTranslationSchema } from './validation'
import { Divider } from '@/shared/ui/styled/Styled'

export const OwnTranslation = () => {
  const { COLORS } = useTheme()
  // const {} = use
  const { t } = useTranslation()
  const navigation = useNavigation()
  const { setLoading } = useLoader()
  const { setWord } = useWordStore()
  const { defaultLanguage } = useUserStore()

  const { params } =
    useRoute<TScreenQueryProps<EScreens.SearchOwnTranslation>>()

  const isHome = !!params.isHome
  const isEdit = !!params._id
  const flag = defaultLanguage ? getFlag(defaultLanguage) : '🇺🇸'

  const {
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: { isValid },
  } = useForm<TCreateOwnTranslationForm>({
    resolver: createOwnTranslationSchema(t),
    defaultValues: {
      description: params?.description || '',
      word: params?.word || '',
      type: params?.type ? params.type : EWordType.word,
      translations: params?.translations?.length ? params.translations : [''],
      lang: params.lang || defaultLanguage || 'US',
      flag: params.flag || flag,
      folderId: '',
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
        folderId: formData.folderId || '',
      }

      if (isEdit) {
        const { data: newWord } = await WordsService.patchWord({
          id: params._id,
          ...data,
        })

        setWord(newWord)
      }

      if (!isEdit) {
        const { data: newWord } = await WordsService.postWord(data)

        setWord(newWord)
      }

      navigation.goBack()
      !isHome && navigation.goBack()
    } catch (error) {
      errorHandler({
        error: error,
        name: 'ErrorCreate',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Background.Container bottom={0} color={COLORS.primary_500}>
      <Header.Standard
        goBack
        backIcon={'ArrowLeftWhite'}
        title={t('own_translation.title')}
        color={COLORS.primary_500}
        titleColor={'white'}
        TitleComponent={Typography.H2}
        rightAction={
          <Button.Text
            textColor={COLORS.white}
            text={t('button.save')}
            disabled={!isValid}
            onPress={handleSubmit(onSave)}
          />
        }
      />
      <Background.Scroll bounces={false} pHorizontal={0} color="neutral_100">
        <S.BlueContainer>
          <Styled.FlexWrapper>
            <Typography.H3 mBottom="16px" color="white">
              {t('own_translation.your_word')}
            </Typography.H3>
          </Styled.FlexWrapper>

          <Controller
            control={control}
            name="word"
            render={({ field: { value, onChange } }) => (
              <Input.Standard
                inputContainerStyle={styles.inputContainer}
                style={styles.flex1}
                value={value}
                onChange={onChange}
                mBottom={'20px'}
              />
            )}
          />

          <Styled.FlexWrapper>
            <Typography.H3 mBottom="16px" color="white">
              {t('own_translation.description')}
            </Typography.H3>
          </Styled.FlexWrapper>

          <Controller
            control={control}
            name="description"
            render={({ field: { value, onChange } }) => (
              <Styled.FlexWrapper>
                <Input.Standard
                  inputContainerStyle={styles.inputContainer}
                  style={styles.flex1}
                  height={'70px'}
                  value={value}
                  multiline
                  onChange={onChange}
                  mBottom={'20px'}
                />
              </Styled.FlexWrapper>
            )}
          />
        </S.BlueContainer>
        <S.PaddingWrapper mTop="12px" mBottom="32px">
          <Controller
            control={control}
            name="type"
            render={({ field: { value, onChange } }) => (
              <WordFeature.TypePicker
                mTop="16px"
                mBottom="16px"
                hideLabel
                {...{ value, onChange: onChange }}
              />
            )}
          />

          <Controller
            control={control}
            name="folderId"
            render={({ field: { value, onChange } }) => (
              <WordFeature.SelectFolder
                folderId={value}
                mBottom="16px"
                onChange={item => {
                  if (!item) {
                    onChange('')
                    return
                  }

                  onChange(item._id)
                }}
              />
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
                            value.map((val, index) =>
                              index === idx ? e : val,
                            ),
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
        </S.PaddingWrapper>
        <Styled.Divider height={70} />
      </Background.Scroll>
    </Background.Container>
  )
}
