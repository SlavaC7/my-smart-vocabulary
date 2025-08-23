import { TWord } from '../../models'

export type TWordAnswerStatsProps = {} & Partial<
  Pick<TWord, 'correct' | 'incorrect'>
>
