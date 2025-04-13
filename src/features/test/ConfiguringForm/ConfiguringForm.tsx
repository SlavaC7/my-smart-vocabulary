import React, { useEffect, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'

import { useTranslation } from 'react-i18next'

import { useTypedSelector } from '@/app/store'

import { Footer } from '@/widgets/footer'

import { getWordSelector } from '@/entities/word'

import { Background, Button, Styled } from '@/shared'

import * as C from './components'
import { TConfiguringForm } from './types'
import { createConfigSchema } from './validation'
import { useGenerateTest } from '@/entities/test'

export const ConfiguringForm = () => {
  const { t } = useTranslation()
  const { words } = useTypedSelector(getWordSelector)
  const { onGenerate } = useGenerateTest()

  const [maxCount, setMaxCount] = useState(words.length)

  const {
    control,
    watch,
    formState: { isValid },
  } = useForm<TConfiguringForm>({
    resolver: zodResolver(createConfigSchema(maxCount)),
    defaultValues: {
      count: 1,
      folders: [],
    },
  })

  const onHandleMaxCount = (folders: string[] | undefined) => {
    let count = 0

    const array = folders || []

    if (!array.length) {
      count = words.length
    }
    if (array.length) {
      count = words.filter(item => array.includes(item?.forderId || '')).length
    }

    setMaxCount(count)
  }

  useEffect(() => {
    const formWatch = watch(data => onHandleMaxCount(data.folders || []))

    return () => {
      formWatch.unsubscribe()
    }
  }, [])

  const onSubmit = () => {
    onGenerate(words)
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
      </Background.Scroll>

      <Footer.Standard>
        <Button.Standard text={t('button.start')} onPress={onSubmit} />
      </Footer.Standard>
    </>
  )
}
