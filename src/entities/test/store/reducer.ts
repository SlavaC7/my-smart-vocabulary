import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Reducers } from '@/app/store/tools'

import { EStoreReducer } from '@/app/store/types'

import { TAnswer } from '../models'

import { TAnsweredPayload, TInitialState } from './types'

const initialState: TInitialState = {
  loading: false,
  test: [],
  testAnswers: [],
  config: {
    count: 0,
    lang: [],
    type: [],
    folders: [],
  },

  correctAnswers: 0,
  totalAnswers: 0,
  incorrectAnswers: 0,
}

export const slice = createSlice({
  name: EStoreReducer.test,
  initialState,
  reducers: {
    setState: Reducers.setState<TInitialState>(),
    clearState: Reducers.clearState<TInitialState>(initialState),

    correctAnswer: (state, { payload }: PayloadAction<TAnsweredPayload>) => {
      state.correctAnswers =
        state.correctAnswers + (payload.type === 'correct' ? 1 : 0)
      state.incorrectAnswers =
        state.incorrectAnswers + (payload.type === 'incorrect' ? 1 : 0)
      state.totalAnswers = ++state.totalAnswers
      //TODO: make a test mutation
    },

    clearStats: (state, {}: PayloadAction<void>) => {
      state.correctAnswers = 0
      state.incorrectAnswers = 0
      state.totalAnswers = 0
    },

    setAnswer: (state, { payload }: PayloadAction<TAnswer>) => {
      state.testAnswers = [...state.testAnswers, payload]
    },
  },
})

export const sliceActions = slice.actions

export default slice.reducer
