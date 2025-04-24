import React from 'react'

import { TestFeatures } from '@/features'

import { Background } from '@/shared/ui/background'

export const Questions = () => {
  return (
    <Background.SafeArea edges={['top']}>
      <TestFeatures.QuestionList />
    </Background.SafeArea>
  )
}
