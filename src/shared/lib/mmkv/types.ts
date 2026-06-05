import { AxiosResponse } from 'axios'

export type TStatus = {
  code: string
  message: string
}

export type TSetStatePayload<TInitialState = {}> = Partial<TInitialState>

export enum EStores {
  user = 'user',
  word = 'word',
  quiz = 'quiz',
}

export type TSagaResponse<Res = unknown> = AxiosResponse<Res>

export type TDefaultTInitialState = {
  loading: boolean
  error: string | null
}
