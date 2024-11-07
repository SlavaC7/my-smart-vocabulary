import React from 'react'

import { Header } from '@/widgets/header'

import { Introduction } from '@/widgets/Introduction'

import { Background } from '@/shared/ui/background'

export const Main = () => {
  return (
    <>
      <Header.Standard title={'Standard header'} />

      <Background.Scroll pHorizontal={16}>
        <Introduction />
      </Background.Scroll>
    </>
  )
}
