import { EStoreReducer, TRootState } from '@/app/store'

export const getWordSelector = (state: TRootState) => state[EStoreReducer.word]
