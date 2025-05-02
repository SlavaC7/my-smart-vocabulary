import React from 'react'

import { TWord } from '../../models'

export type TMyCardProps = {
  rightAction: () => React.ReactNode
  word: TWord
}
