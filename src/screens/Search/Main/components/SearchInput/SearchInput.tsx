import React, { useState } from 'react'

import { Input } from '@/shared'

export const SearchInput = () => {
  const [value, setValue] = useState('')

  return <Input.Standard leftIcon="Search" onChange={setValue} value={value} />
}
