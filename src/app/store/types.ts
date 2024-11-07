import { AxiosResponse } from 'axios'

import rootReducer from './reducer'

export type TRootState = ReturnType<typeof rootReducer>

export type TStatus = {
  code: string
  message: string
}

export type TSetStatePayload<TInitialState = {}> = Partial<TInitialState>

export enum EStoreReducer {
  user = 'user',
}

export type TSagaResponse<Res = unknown> = AxiosResponse<Res>
