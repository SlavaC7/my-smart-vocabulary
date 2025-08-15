import React, { useEffect, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'

import { useTranslation } from 'react-i18next'

import { EScreens } from '@/app/navigation'

import { Footer } from '@/widgets/footer'

import { WordFeature } from '@/features'

import { useGenerateTest } from '@/entities/test'
import { useWordStore } from '@/entities/word'

import { Background, Button, Styled, useNavigation } from '@/shared'

import * as C from './components'
import { TConfiguringForm } from './types'
import { createConfigSchema } from './validation'

export const ConfiguringForm = () => {
  const { t } = useTranslation()
  const { words } = useWordStore()
  const { onGenerate } = useGenerateTest()
  const { navigate } = useNavigation()

  const [maxCount, setMaxCount] = useState(words.length)

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<TConfiguringForm>({
    resolver: zodResolver(createConfigSchema(maxCount)),
    defaultValues: {
      count: 1,
      folders: [],
      type: [],
      lang: [],
    },
  })

  console.log('errors =>', errors)

  const onHandleMaxCount = (folders: (string | undefined)[]) => {
    let count = 0

    const array = folders || []

    if (!array.length) {
      count = words.length
    }
    if (array.length) {
      count = words.filter(item => array.includes(item?.folderId || '')).length
    }

    setMaxCount(count)
  }

  useEffect(() => {
    const formWatch = watch(
      data => data.folders && onHandleMaxCount(data.folders || []),
    )

    return () => {
      formWatch.unsubscribe()
    }
  }, [])

  const onSubmit = (data: TConfiguringForm) => {
    console.log('onSubmit =>', data)
    const quiz = onGenerate(words, data)

    if (quiz.length) {
      navigate(EScreens.TestsQuestion)
    }

    if (!quiz.length) {
      //TODO: MAke a tast
    }
  }

  return (
    <>
      <Background.Scroll>
        <Controller
          control={control}
          name="folders"
          render={({ field: { value, onChange } }) => (
            <C.SelectFolders {...{ value, onChange }} />
          )}
        />
        <Styled.Divider height={16} />

        <Controller
          control={control}
          name="count"
          render={({ field: { value, onChange } }) => (
            <C.Count {...{ value, onChange }} />
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
            <C.LangPicker {...{ value, onChange }} />
          )}
        />
      </Background.Scroll>

      <Footer.Standard>
        <Button.Standard
          text={t('button.start')}
          onPress={handleSubmit(onSubmit)}
        />
      </Footer.Standard>
    </>
  )
}
