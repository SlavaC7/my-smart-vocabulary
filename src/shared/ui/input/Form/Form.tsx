import React from 'react'

import { Input } from '..'
import { TStandardInputProps } from '../Standard/types'

import { styles } from './styles'

export const Form = (props: TStandardInputProps) => {
  return (
    <Input.Standard
      {...props}
      labelColor="black"
      inputContainerStyle={[styles.input, props.inputContainerStyle]}
      height="46px"
    />
  )
}
