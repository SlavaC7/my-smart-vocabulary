import { EStoreReducer, TRootState } from '@/app/store'

export const getTestSelector = (state: TRootState) => state[EStoreReducer.test]
