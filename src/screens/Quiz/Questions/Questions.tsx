import React from 'react'

import { QuizFeatures } from '@/features'

import { Background } from '@/shared/ui/background'

export const Questions = () => {
  return (
    <Background.SafeArea edges={['top']}>
      <QuizFeatures.QuestionList />
    </Background.SafeArea>
  )
}
