import { REDUX_KEY } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import createSagaMiddleware from 'redux-saga'

import rootReducer from './reducer'
import rootSaga from './saga'

import { EStoreReducer } from './types'

const whitelist: string[] = [EStoreReducer.user, EStoreReducer.word]

const persistedReducer = persistReducer(
  {
    key: REDUX_KEY,
    storage: AsyncStorage,
    whitelist,
  },
  rootReducer,
)

const sagaMiddleware = createSagaMiddleware()
const middlewares = [sagaMiddleware]

const store = configureStore({
  reducer: persistedReducer,
  middleware: gDM =>
    gDM({
      serializableCheck: false,
    }).concat(middlewares),
  devTools: true,
})

export const persistor = persistStore(store)

// Run saga
sagaMiddleware.run(rootSaga)

export type AppDispatch = typeof store.dispatch

export default store
