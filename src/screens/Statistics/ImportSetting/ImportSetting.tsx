import React from 'react'

import { useTranslation } from 'react-i18next'

import { Header } from '@/widgets/header'

import { Background } from '@/shared'

export const ImportSetting = () => {
  const { t } = useTranslation()

  return (
    <Background.Container>
      <Header.Standard goBack title={t('export_import.import')} />

      <Background.Standard pHorizontal={16}>
        {/* <WordFeature.ImportList data={wordsList} setData={setWordsList} /> */}
      </Background.Standard>
    </Background.Container>
  )
}
