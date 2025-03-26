import React, { forwardRef } from 'react'

import * as C from './components'
import { TConfiguringFormRef } from './types'

export const ConfiguringForm = forwardRef<TConfiguringFormRef, {}>(
  ({}, ref) => {
    return (
      <>
        <C.SelectFolders />
      </>
    )
  },
)
