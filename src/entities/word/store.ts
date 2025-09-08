import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { errorHandler, zustandStorage } from '@/shared'
import { EStores } from '@/shared/lib/mmkv/types'

import { TFolder, TWord } from './models'
import { FoldersService } from './services'

export type TWordsStoreProps = {
  words: TWord[]
  folders: TFolder[]
}

export type TWordStoreMethods = {
  clear: () => void
  setWordState: (data: Partial<TWordsStoreProps>) => void
  setWord: (data: TWord) => void
  setFolder: (data: TFolder) => void
  updateFolders: () => Promise<void>
  deleteFolder: (folderId: string) => Promise<void>
}

export type TWordStore = TWordsStoreProps & TWordStoreMethods

export const useWordStore = create<TWordStore>()(
  persist(
    (set, _, state) => ({
      words: [],
      folders: [],
      clear: () =>
        set({
          words: [],
          folders: [],
        }),
      setWordState: (store: Partial<TWordsStoreProps>) => set(store),
      updateFolders: async () => {
        try {
          const { data } = await FoldersService.getFolders()

          console.log('updateFolders', data)
          set({
            folders: data.docs,
          })
        } catch (error) {
          errorHandler({
            error: error,
            name: 'updateFolders',
          })
        }
      },
      setWord: (word: TWord) => {
        const words = state.getState().words

        const newWords = words.filter(w => w._id !== word._id)
        set({
          words: [...newWords, word],
        })
      },
      setFolder: (folder: TFolder) => {
        const folders = state.getState().folders

        const newFolders = folders.filter(w => w._id !== folder._id)
        set({
          folders: [...newFolders, folder],
        })
      },

      deleteFolder: async (folderId: string) => {
        try {
          await FoldersService.deleteFolder({ id: folderId })

          state.getState().updateFolders()
        } catch (error) {
          errorHandler({
            error: error,
            name: 'deleteFolder',
          })
        }
      },
    }),
    {
      name: EStores.word,
      partialize: state => ({
        words: state.words,
        folder: state.folders,
      }),
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
)
