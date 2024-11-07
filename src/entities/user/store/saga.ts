import { PayloadAction } from '@reduxjs/toolkit'
import { call, put, takeLatest } from 'redux-saga/effects'

import { TSagaResponse } from '@/app/store'

import { generateFormData } from '@/app/store/tools'

import { userActions } from './actions'
import { TGetUserPayload } from './types'
import { ActionsTypes } from './actionTypes'

function* getUserWorker({}: PayloadAction<TGetUserPayload>) {
  // yield put(userActions.setState({ loading: true }))
  // try {
  //   const response: TSagaResponse<TGetUserResponce> = yield call(User.getUser)
  //   yield put(userActions.setUser(response.data ?? {}))
  // } catch (e) {
  //   console.log('getUser err', e)
  // }
  // yield put(userActions.setState({ loading: false }))
}

export function* userWatcher() {
  yield takeLatest(ActionsTypes.getUser, getUserWorker)
}
