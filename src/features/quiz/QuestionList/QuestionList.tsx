import React, { useCallback, useMemo, useRef, useState } from 'react'

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
  const activeQuiz = useQuizStore(state => state.activeQuiz)
  const setQuizState = useQuizStore(state => state.setQuizState)

  const ref = useRef<ICarouselInstance>(null)
  const [disable, setDisable] = useState<boolean>(false)
  const activeIndex = useRef(0)

  const { navigate } = useNavigation()

  // Questions are immutable during a run. Freeze them per quiz id so that
  // answering (which replaces activeQuiz in the store) does not churn the
  // carousel data or the item identities passed to each memoized QuestionCard.
  const questions = useMemo(
    () => activeQuiz?.quiz ?? [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeQuiz?._id],
  )

  // Keep latest values reachable from the stable callbacks below, so those
  // callbacks never have to be recreated (which would break QuestionCard memo).
  const latest = useRef({ activeQuiz, setQuizState, navigate, questions })
  latest.current = { activeQuiz, setQuizState, navigate, questions }

  const onCompleteTest = useCallback(async () => {
    const { activeQuiz, setQuizState, navigate } = latest.current
    if (!activeQuiz?._id) return
    try {
      const { data } = await QuizService.postQuizComplete({
        id: activeQuiz._id,
      })

      setQuizState({ activeQuiz: data })

      navigate(EScreens.TestsSuccess)
    } catch (error) {
      errorHandler({
        error: error,
        name: 'onCompleteTest',
      })
    }
  }, [])

  const onPress = useCallback(() => {
    setTimeout(() => {
      if (activeIndex.current + 1 === latest.current.questions.length) {
        onCompleteTest()
        return
      }

      ref.current?.next()
    }, 1500)
  }, [onCompleteTest])

  const renderItem = useCallback(
    ({ item }: { item: TQuizItem }) => {
      const quizId = latest.current.activeQuiz?._id
      if (!quizId) {
        return <></>
      }
      return <QuestionCard {...item} quizId={quizId} onPressItem={onPress} />
    },
    [onPress],
  )

  const onSetActiveIndex = useCallback((index: number) => {
    activeIndex.current = index
  }, [])

  const _goBack = useCallback(() => {
    navigate(EScreens.TestsMain)
  }, [navigate])

  return (
    <>
      <Background.Standard color={'transparent'}>
        <Styled.FlexWrapper justify={'space-between'} style={styles.header}>
          <Styled.Touchable width={'auto'} onPress={_goBack}>
            <Icon name={'AngleArrowLeft'} size={32} />
          </Styled.Touchable>

          <QuizFeatures.Progress
            width={wp(78)}
            total={questions.length || 1}
            count={(activeIndex.current || 0) + 1}
          />
        </Styled.FlexWrapper>

        {!!questions.length && (
          <Carousel
            ref={ref}
            data={questions}
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
