import { all } from 'redux-saga/effects'

import { userWatcher } from '@/entities/user/store'

//Configure your saga

function* rootSaga() {
  yield all([userWatcher()])
}

export default rootSaga
