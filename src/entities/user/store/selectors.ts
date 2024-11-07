import { EStoreReducer, TRootState } from '@/app/store'

export const getUserSelector = (state: TRootState) => state[EStoreReducer.user]
