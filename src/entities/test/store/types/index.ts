import { TConfig, TTestItem } from '../../models'

export type TInitialState = {
  loading: boolean
  config: TConfig
  test: TTestItem[]

  incorrectAnswers: number
  correctAnswers: number
  totalAnswers: number
}

export type TAnsweredPayload = {
  type: 'correct' | 'incorrect'
}
