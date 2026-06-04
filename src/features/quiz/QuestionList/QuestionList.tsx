import React, { useCallback, useRef, useState } from 'react'

import { Dimensions } from 'react-native'

import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel'

import { EScreens } from '@/app/navigation'

import { QuizFeatures } from '@/features'

import { TQuizItem } from '@/entities/quiz'

import { QuizService } from '@/entities/quiz/services'
import { useQuizStore } from '@/entities/quiz/store'

import {
  Background,
  errorHandler,
  Icon,
  Styled,
  useNavigation,
  wp,
} from '@/shared'

import { QuestionCard } from '../QuestionCard'

import { styles } from './styled'
import { TQuestionListProps } from './types'

const { width: viewportWidth, height } = Dimensions.get('window')

export const QuestionList = ({}: TQuestionListProps) => {
  const { activeQuiz, setQuizState } = useQuizStore()
  const ref = useRef<ICarouselInstance>(null)
  const [disable, setDisable] = useState<boolean>(false)
  const activeIndex = useRef(0)

  const { navigate } = useNavigation()

  const onCompleteTest = async () => {
    if (!activeQuiz?._id) return
    try {
      const { data } = await QuizService.postQuizComplete({
        id: activeQuiz._id,
      })

      console.log('postQuizComplete =>', data)

      setQuizState({ activeQuiz: data })

      navigate(EScreens.TestsSuccess)
    } catch (error) {
      errorHandler({
        error: error,
        name: 'onCompleteTest',
      })
    }
  }

  const onPress = () => {
    console.log('NEXT', activeIndex.current + 1, activeQuiz?.quiz.length)

    setTimeout(() => {
      if (activeIndex.current + 1 === activeQuiz?.quiz.length) {
        onCompleteTest()
        return
      }
      console.log('snapToNext')

      ref.current?.next()
    }, 1500)
  }

  const renderItem = useCallback(
    ({ item }: { item: TQuizItem }) => {
      if (!activeQuiz) {
        return <></>
      }
      return (
        <QuestionCard {...item} quizId={activeQuiz._id} onPressItem={onPress} />
      )
    },
    [activeQuiz],
  )

  const onSetActiveIndex = (index: number) => {
    activeIndex.current = index
  }

  const _goBack = () => {
    navigate(EScreens.TestsMain)
  }

  return (
    <>
      <Background.Standard color={'transparent'}>
        <Styled.FlexWrapper justify={'space-between'} style={styles.header}>
          <Styled.Touchable width={'auto'} onPress={_goBack}>
            <Icon name={'AngleArrowLeft'} size={32} />
          </Styled.Touchable>

          <QuizFeatures.Progress
            width={wp(78)}
            total={activeQuiz?.quiz.length || 1}
            count={(activeIndex.current || 0) + 1}
          />
        </Styled.FlexWrapper>

        {!!activeQuiz?.quiz.length && (
          <Carousel
            ref={ref}
            data={activeQuiz.quiz}
            renderItem={renderItem}
            onSnapToItem={onSetActiveIndex}
            width={viewportWidth}
            height={height}
            loop={false}
            scrollAnimationDuration={300}
            enabled={!disable}
          />
        )}
      </Background.Standard>
    </>
  )
}
