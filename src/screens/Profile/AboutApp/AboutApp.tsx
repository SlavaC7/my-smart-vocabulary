import React from 'react'

import { Header } from '@/widgets/header'

import { appVersion, Background, Typography } from '@/shared'

export const AboutApp = () => {
  return (
    <Background.Container>
      <Header.Standard goBack />
      <Background.Standard pHorizontal={16}>
        <Typography.H3>Version: {appVersion}</Typography.H3>
        <Typography.Body1R mTop="16px">
          This app is designed for users who have just started learning a new
          language and need to build their vocabulary. {'\n'}
          {'\n'}For people who have a much higher level in the language, the app
          can help in learning words of a specific topic. With this app, you can
          record and practice your vocabulary whenever you want.{' '}
        </Typography.Body1R>
      </Background.Standard>
    </Background.Container>
  )
}
