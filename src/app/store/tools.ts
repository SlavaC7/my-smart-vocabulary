import { PayloadAction } from '@reduxjs/toolkit'
import { WritableDraft } from 'immer/dist/internal'
import _ from 'lodash'
import { TypedUseSelectorHook, useSelector } from 'react-redux'

import { TRootState, TSetStatePayload } from './types'

export const useTypedSelector: TypedUseSelectorHook<TRootState> = useSelector

export const ReduxTools = {
  withPayloadType: <T>() => {
    return (t: T) => ({ payload: t })
  },
}

export const Reducers = {
  setState:
    <TInitialState>() =>
    (
      state: WritableDraft<TInitialState>,
      { payload }: PayloadAction<TSetStatePayload<TInitialState>>,
    ) => {
      ;(Object.keys(state) as (keyof typeof state)[]).forEach(key => {
        const value = payload[key] as never

        state[key] = _.isBoolean(value) ? value : value || state[key]
      })
    },
  setError:
    <TInitialState extends { loading: boolean }>() =>
    (
      state: WritableDraft<TInitialState>,
      { payload }: PayloadAction<TSetStatePayload<TInitialState>>,
    ) => {
      if (state.loading) {
        state.loading = false as never
      }
    },
  clearState:
    <TInitialState>(initialState: TInitialState) =>
    (state: WritableDraft<TInitialState>) => {
      ;(Object.keys(state) as (keyof typeof state)[]).forEach(key => {
        state[key] = initialState[key] as never
      })
    },
}
