import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Reducers } from '@/app/store/tools'

import { EStoreReducer } from '@/app/store/types'

import { TUser } from '../models/common'

import { TInitialState } from './types'

const initialState: TInitialState = {
  user: null,
  loading: false,
}

export const slice = createSlice({
  name: EStoreReducer.user,
  initialState,
  reducers: {
    setState: Reducers.setState<TInitialState>(),
    clearState: Reducers.clearState<TInitialState>(initialState),
    setUser: (state, { payload }: PayloadAction<TUser>) => {
      state.user = payload
    },

    setUserError: () => {},
  },
})

export const sliceActions = slice.actions

export default slice.reducer
