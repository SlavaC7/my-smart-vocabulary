import { TWord } from '@/entities/word'

import { TMargin } from '@/shared'

export type TWordItemProps = { data: TWord; onPress?: () => void } & TMargin
