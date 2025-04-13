import { TAnswer, TConfig, TTestItem } from '../../models'

export type TInitialState = {
  loading: boolean
  config: TConfig
  test: TTestItem[]
  testAnswers: TAnswer[]

  incorrectAnswers: number
  correctAnswers: number
  totalAnswers: number
}

export type TAnsweredPayload = {
  type: 'correct' | 'incorrect'
}
