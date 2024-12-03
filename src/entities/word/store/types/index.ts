import { TFolder, TWord } from '../../models'

export type TInitialState = {
  loading: boolean

  words: Array<TWord>

  folders: Array<TFolder>
}
