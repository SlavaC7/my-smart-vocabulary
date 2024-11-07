import { TUser } from '../../models/common'

export * from './getUser'

export type TInitialState = {
  user: TUser | null
  loading: boolean
}
