import React from 'react'

import { TestFeatures } from '@/features'

import { Background } from '@/shared/ui/background'

export const Questions = () => {
  return (
    <Background.SafeArea>
      <TestFeatures.QuestionList />
    </Background.SafeArea>
  )
}
