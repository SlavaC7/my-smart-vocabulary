import React, { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'

import { useTranslation } from 'react-i18next'

import { Footer } from '@/widgets/footer'

import { WordFeature } from '@/features'

import { useQuizStore } from '@/entities/quiz'
import { QuizService } from '@/entities/quiz/services'
import { TFolder } from '@/entities/word'

import { Background, Button, Styled, useNavigation } from '@/shared'

import * as C from './components'
import { TConfiguringForm } from './types'
import { createConfigSchema } from './validation'

export const ConfiguringForm = () => {
  const { t } = useTranslation()
  const {} = useQuizStore()
  const { navigate } = useNavigation()

  const [maxCount, setMaxCount] = useState(50)

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<TConfiguringForm>({
    resolver: zodResolver(createConfigSchema(maxCount)),
    defaultValues: {
      count: 50,
      folders: [],
      type: [],
      lang: [],
    },
  })

  const onHandleMaxCount = (folders: TFolder[]) => {
    let count = 0

    const array = folders || []

    if (!array.length) {
      count = 50
    }

    if (array.length) {
      count = array.reduce((acc, folder) => (acc += folder?.count || 0), 0)
    }
    setValue('count', count)

    console.log('count', count)

    setMaxCount(count)
  }

  const onSubmit = async (data: TConfiguringForm) => {
    console.log('onSubmit =>', data)
    try {
      const { data: quiz } = await QuizService.postCreateQuiz({
        ...data,
        folders: data.folders.map(item => item._id),
      })

      console.log('quiz =>', quiz)
    } catch (error) {
      console.log('ConfiguringForm error =>', error)
    }
  }

  return (
    <>
      <Background.Scroll>
        <Controller
          control={control}
          name="folders"
          render={({ field: { value, onChange } }) => (
            <C.SelectFolders
              {...{ value }}
              onChange={newValue => {
                onChange(newValue)
                onHandleMaxCount(newValue)
              }}
            />
          )}
        />
        <Styled.Divider height={16} />

        <Controller
          control={control}
          name="count"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <C.Count {...{ value, onChange }} error={error?.message} />
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
