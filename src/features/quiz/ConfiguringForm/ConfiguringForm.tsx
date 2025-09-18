import React, { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'

import { useTranslation } from 'react-i18next'

import { EScreens } from '@/app/navigation'

import { Footer } from '@/widgets/footer'

import { WordFeature } from '@/features'

import { EQuizItemMode, useQuizStore } from '@/entities/quiz'
import { QuizService } from '@/entities/quiz/services'
import { EWordType, TFolder } from '@/entities/word'

import { langsArray } from '@/entities/word/utils'

import {
  Background,
  Button,
  errorHandler,
  Styled,
  useNavigation,
} from '@/shared'

import * as C from './components'
import { TConfiguringForm } from './types'
import { createConfigSchema } from './validation'

export const ConfiguringForm = () => {
  const { t } = useTranslation()
  const { setQuizState } = useQuizStore()
  const { navigate } = useNavigation()

  const [maxCount, setMaxCount] = useState(50)

  const { control, setValue, handleSubmit } = useForm<TConfiguringForm>({
    resolver: zodResolver(createConfigSchema(maxCount)),
    defaultValues: {
      count: 50,
      folders: [],
      type: [EWordType.phrase, EWordType.word],
      lang: langsArray.map(item => item.code),
      mode: [EQuizItemMode.match, EQuizItemMode.write_word],
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

    setMaxCount(count)
  }

  const onSubmit = async (data: TConfiguringForm) => {
    console.log('onSubmit =>', data)
    try {
      const { data: quiz } = await QuizService.postCreateQuiz({
        ...data,
        folders: data.folders.map(item => item._id),
      })
      setQuizState({
        activeQuiz: quiz,
      })
      navigate(EScreens.TestsQuestion)
      console.log('quiz =>', quiz)
    } catch (error) {
      errorHandler({
        error: error,
        name: 'ConfiguringForm',
      })
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
            <WordFeature.TypePicker {...{ value, onChangeArray: onChange }} />
          )}
        />

        <Controller
          control={control}
          name="mode"
          render={({ field: { value, onChange } }) => (
            <C.ModePicker {...{ value, onChange }} />
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
