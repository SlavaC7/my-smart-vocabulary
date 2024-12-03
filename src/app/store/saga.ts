import { all } from 'redux-saga/effects'

import { userWatcher } from '@/entities/user/store'
import { wordWatcher } from '@/entities/word'

//Configure your saga

function* rootSaga() {
  yield all([userWatcher(), wordWatcher()])
}

export default rootSaga
