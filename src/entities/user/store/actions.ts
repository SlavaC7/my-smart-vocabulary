import { createAction } from '@reduxjs/toolkit'

import { ActionsTypes } from './actionTypes'
import { sliceActions } from './reducer'
import { TGetUserPayload } from './types'

export const userActions = {
  ...sliceActions,
  getUserRequest: createAction<TGetUserPayload>(ActionsTypes.getUser),
}
