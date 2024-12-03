import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Reducers } from '@/app/store/tools'

import { EStoreReducer } from '@/app/store/types'

import { TFolder, TWord } from '../models'

import { TInitialState } from './types'

const initialState: TInitialState = {
  loading: false,
  words: [],
  folders: [],
}

export const slice = createSlice({
  name: EStoreReducer.word,
  initialState,
  reducers: {
    setState: Reducers.setState<TInitialState>(),
    clearState: Reducers.clearState<TInitialState>(initialState),

    addWord: (state, { payload }: PayloadAction<TWord>) => {
      state.words.unshift({ ...payload, createdAt: new Date().toISOString() })
    },

    removeWord: (state, { payload }: PayloadAction<string>) => {
      state.words = state.words.filter(item => item._id !== payload)
    },

    addToFolder: (
      state,
      { payload }: PayloadAction<{ wordId: string; folderId: string | null }>,
    ) => {
      state.words = state.words.map(item =>
        item._id === payload.wordId
          ? { ...item, forderId: payload.folderId }
          : item,
      )
    },

    createFolder: (state, { payload }: PayloadAction<TFolder>) => {
      state.folders.unshift(payload)
    },

    removeFolder: (state, { payload }: PayloadAction<string>) => {
      state.folders = state.folders.filter(item => item._id !== payload)
      state.words = state.words.map(item =>
        item.forderId === payload ? { ...item, forderId: null } : item,
      )
    },
  },
})

export const sliceActions = slice.actions

export default slice.reducer
