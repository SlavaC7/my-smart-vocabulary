import { useEffect, useState } from 'react'

import { errorHandler } from '@/shared'

import { TFolder, TWord } from '../models'
import { FoldersService, WordsService } from '../services'

export const useGetWord = (id: string, initialState: TWord) => {
  const [word, setWord] = useState<TWord>(initialState)
  const [folder, setFolder] = useState<TFolder | null>(null)

  const getFolder = async (folderId: string | undefined) => {
    if (!folderId) {
      setFolder(null)
      return
    }
    try {
      const { data: newFolder } = await FoldersService.getFolderById({
        id: folderId,
      })

      setFolder(newFolder)
    } catch (error) {
      errorHandler({
        error: error,
        name: 'getFolder',
      })
    }
  }

  const getAction = async () => {
    //TODO: think about storage word
    // const storageWord = words.find(item => item._id === id)

    // if (storageWord) {
    //   setWord(storageWord)
    //   getFolder(storageWord.folderId)

    //   return
    // }

    try {
      const { data: newWord } = await WordsService.getWordById({ id })

      console.log('word =>', word)

      setWord(newWord)
      getFolder(newWord.folderId)
    } catch (error) {
      errorHandler({
        error: error,
        name: 'useGetWord',
      })
    }
  }
  useEffect(() => {
    getAction()
  }, [])
  return {
    word,
    folder,
    getAction,
  }
}
