import React from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { UserService } from '@/entities/user/services'

import { Button, Input, Typography } from '@/shared'

import { TCreateProfileProps } from './types'
import { createProfileFormValidation } from './validation'

export const CreateProfileForm = () => {
  const { t } = useTranslation()

  const { control, handleSubmit } = useForm<TCreateProfileProps>({
    resolver: zodResolver(createProfileFormValidation(t)),
    defaultValues: {
      name: '',
      email: '',
    },
  })

  const onSubmit = handleSubmit(async data => {
    try {
      console.log('Profile data submitted:', data)

      const { data: user } = await UserService.postUser(data)

      console.log('PostProfile Back-end:', user)
    } catch (error) {
      console.log('Create user error:', { ...error })
    }
  })

  return (
    <>
      <Typography.H1 mBottom="5px">{t('auth.welcome')}</Typography.H1>
      <Typography.Body1R mBottom="16px" color="neutral_500">
        {t('auth.simple_auth')}
      </Typography.Body1R>

      <Controller
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <Input.Form
            label={t('inputs.name')}
            mBottom="16px"
            {...{ value, onChange }}
            error={error?.message}
          />
        )}
        name={'name'}
        control={control}
      />

      <Controller
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <Input.Form
            label={t('inputs.email')}
            {...{ value, onChange }}
            error={error?.message}
          />
        )}
        name={'email'}
        control={control}
      />

      <Button.Standard mTop="20px" text={t('button.save')} onPress={onSubmit} />
    </>
  )
}
