import { useState } from 'react'

import { Platform } from 'react-native'

import * as RNFS from '@dr.pogodin/react-native-fs'
import { STORAGE_VERSION } from '@env'
import { types, pick } from '@react-native-documents/picker'
import Share from 'react-native-share'

import Toast from 'react-native-toast-message'

import { useTypedSelector } from '@/app/store'

import { TWord } from '../../models'
import { getWordSelector } from '../../store'

type TFileData = { storage: number; data: TWord[] }

export const useExportImport = () => {
  const { words } = useTypedSelector(getWordSelector)
  const [wordsList, setWordsList] = useState<TWord[]>([])
  const [error, setError] = useState<string>('')

  const exportToJsonFile = async () => {
    try {
      const date = new Date()
      const formattedDate = `${date.getDate().toString().padStart(2, '0')}.${(
        date.getMonth() + 1
      )
        .toString()
        .padStart(2, '0')}.${date.getFullYear()}`
      const fileName = `export_MSV_${formattedDate}.json`

      console.log('fileName =>', fileName)

      // Определяем путь для сохранения файла
      const downloadsPath =
        Platform.select({
          ios: RNFS.DocumentDirectoryPath,
          android: RNFS.DownloadDirectoryPath,
        }) || RNFS.DocumentDirectoryPath

      console.log('downloadsPath =>', downloadsPath)

      const filePath = `${downloadsPath}/${fileName}`

      console.log('filePath =>', filePath)

      const data: TFileData = {
        storage: STORAGE_VERSION,
        data: words,
      }

      const jsonData = JSON.stringify(data, null, 2)

      console.log('jsonData =>', jsonData)

      const fileExists = await RNFS.exists(filePath)

      if (fileExists) {
        console.log('File already exists, overwriting...')
        await RNFS.unlink(filePath)
      }

      // Создаем/перезаписываем файл
      await RNFS.writeFile(filePath, jsonData, 'utf8')

      Toast.show({
        type: 'success',
        text2: fileExists ? 'File overwritten' : 'File saved',
      })

      // Открываем диалог шаринга
      await Share.open({
        title: 'Export Word',
        subject: 'Word Export',
        url: `file://${filePath}`,
        type: 'application/json',
      })

      setError('')
    } catch (e) {
      setError(`Export failed: ${e instanceof Error ? e.message : String(e)}`)
      console.error('Export error:', e)

      Toast.show({
        type: 'error',
        text2: 'Export failed',
      })
    }
  }

  const importFromJsonFile = async () => {
    try {
      setError('')

      const res = await pick({
        type: [types.json],
        allowMultiSelection: false,
      })

      const fileUri = res[0]?.uri
      if (!fileUri) throw new Error('File not selected')

      // Читаем файл (для Android может потребоваться другой способ чтения)
      let fileContent
      if (Platform.OS === 'android') {
        fileContent = await RNFS.readFile(fileUri, 'utf8')
      } else {
        fileContent = await RNFS.readFile(fileUri, 'utf8')
      }

      const parsedData = JSON.parse(fileContent)

      console.log('res =>', parsedData)
      const typedData: TFileData | null =
        'storage' in parsedData && 'data' in parsedData ? parsedData : null

      if (!typedData) {
        Toast.show({
          type: 'error',
          text2: 'File is Infalid',
        })
        throw new Error('typedData is null')
      }

      if (!Array.isArray(typedData.data)) {
        throw new Error('Imported data is not an array')
      }

      //TODO: make a validate storage version

      const validatedData = typedData.data.filter(item => {
        return (
          typeof item === 'object' &&
          item !== null &&
          '_id' in item &&
          typeof item._id === 'string' &&
          'text' in item &&
          typeof item.text === 'string'
        )
      })
      console.log('validatedData =>', validatedData)

      setWordsList(typedData.data)
    } catch (err) {
      // if (DocumentPicker.isCancel(err)) {
      //   console.log('User cancelled file picker')
      //   return null
      // }

      const errorMsg = `Import failed: ${
        err instanceof Error ? err.message : String(err)
      }`
      setError(errorMsg)
      console.error('Import error:', err)
      return null
    } finally {
      // setIsImporting(false)
    }
  }

  return {
    wordsList,
    error,
    setWordsList,
    exportToJsonFile,
    importFromJsonFile,
  }
}
