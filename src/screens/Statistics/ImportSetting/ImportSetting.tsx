import React from 'react'

import { useTranslation } from 'react-i18next'

import { Header } from '@/widgets/header'

import { WordFeature } from '@/features'

import { useExportImport } from '@/entities/word'

import { Background } from '@/shared'

export const ImportSetting = () => {
  const { t } = useTranslation()
  const { importFromJsonFile, wordsList, setWordsList } = useExportImport()

  return (
    <Background.Container>
      <Header.Standard goBack title={t('export_import.import')} />

      <Background.Standard pHorizontal={16}>
        <WordFeature.ImportInformation
          data={wordsList}
          onImport={importFromJsonFile}
          onSubmit={() => {}}
        />

        <WordFeature.ImportList data={wordsList} setData={setWordsList} />
      </Background.Standard>
    </Background.Container>
  )
}
