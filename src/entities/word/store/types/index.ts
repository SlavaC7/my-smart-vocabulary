import { TFolder, TWord } from '../../models'

export type TInitialState = {
  loading: boolean

  words: Array<TWord>

  folders: Array<TFolder>
}

export type TChangeWord = { _id: string } & Partial<TWord>
