import React from 'react'

import { QuizFeatures } from '@/features'

import { QuizEntity } from '@/entities/quiz'

import { Background } from '@/shared/ui/background'

export const Questions = () => {
  return (
    <Background.SafeArea edges={['top']}>
      <QuizEntity.GradientBackground />
      <QuizFeatures.QuestionList />
    </Background.SafeArea>
  )
}
