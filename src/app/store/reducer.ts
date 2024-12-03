import { combineReducers } from '@reduxjs/toolkit'

import { userReducer } from '@/entities/user/store'

import { wordReducer } from '@/entities/word'

import { EStoreReducer } from './types'

//Configure your reducers
export default combineReducers({
  [EStoreReducer.user]: userReducer,
  [EStoreReducer.word]: wordReducer,
})
