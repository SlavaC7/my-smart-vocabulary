import React, { useCallback, useEffect, useRef, useState } from 'react'

import { Dimensions, ListRenderItem } from 'react-native'

import Carousel, { CarouselProperties } from 'react-native-snap-carousel'

import { EScreens } from '@/app/navigation'

import { TQuizItem } from '@/entities/quiz'

import { QuizService } from '@/entities/quiz/services'
import { useQuizStore } from '@/entities/quiz/store'

import { Background, Icon, Styled, useNavigation } from '@/shared'

import { QuestionCard } from '../QuestionCard'

import { PurpleContainer, styles } from './styled'
import { TQuestionListProps } from './types'

const { width: viewportWidth, height } = Dimensions.get('window')

export const QuestionList = ({}: TQuestionListProps) => {
  const { activeQuiz } = useQuizStore()
  const ref = useRef<Carousel<TQuizItem>>(null)
  const [disable, setDisable] = useState<boolean>(false)
  const activeIndex = useRef(0)

  const { goBack, navigate } = useNavigation()

  useEffect(() => {
    if (disable) {
      setTimeout(() => {
        setDisable(false)
      }, 10)
    }
  }, [disable])

  const sliderParams: Omit<
    CarouselProperties<unknown>,
    'data' | 'renderItem'
  > = {
    autoplay: false,
    loop: false,
    sliderWidth: viewportWidth,
    itemWidth: viewportWidth,
    slideStyle: [{ width: viewportWidth, height: height }],
    enableMomentum: false,
    scrollEnabled: true,
    decelerationRate: 'fast',
  }

  // const onViewableItemsChanged = useRef(
  //   ({ changed }: { changed: ViewToken<TQuestion>[] }) => {
  //     changed.forEach(el => {
  //       if (!!el.isViewable && el?.item.id) {
  //         setViewedId(el?.item.id)
  //       }
  //     })
  //   },
  // ).current

  const onCompleteTest = async () => {
    if (!activeQuiz?._id) return
    try {
      await QuizService.postQuizComplete({ id: activeQuiz._id })

      navigate(EScreens.TestsSuccess)
    } catch (error) {
      console.log('error', error)
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

      ref.current?.snapToNext()
    }, 500)
  }

  onPress()

  const renderItem: ListRenderItem<TQuizItem> = useCallback(
    ({ item }) => {
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
  return (
    <>
      <PurpleContainer />

      <Background.Standard color={'transparent'}>
        <Styled.FlexWrapper justify={'space-between'} style={styles.header}>
          <Styled.Touchable width={'auto'} onPress={goBack}>
            <Icon name={'AngleArrowLeft'} size={32} />
          </Styled.Touchable>

          {/* <Styled.Touchable width={'auto'} onPress={goBack}>
            <Icon name={'AngleArrowLeft'} size={32} />
          </Styled.Touchable> */}
        </Styled.FlexWrapper>

        {activeQuiz?.quiz.length && (
          <Carousel
            ref={ref}
            data={activeQuiz.quiz}
            renderItem={renderItem}
            scrollEnabled={false}
            onSnapToItem={onSetActiveIndex}
            pagingEnabled
            // ListEmptyComponent={renderEmpty}
            {...sliderParams}
          />
        )}
      </Background.Standard>

      {/* <BottomBar disableButton>
        <Styled.FlexWrapper flexDirection={'column'}>
          {!isListEmpty && (
            <>
              {!isFavorite && (
                <Styled.FlexWrapper mBottom={'16px'} justify={'space-between'}>
                  <Button.Standard
                    disabled={disable}
                    onPress={() => onPressRate('negative')}
                    width={'48%'}
                    icon={'Dislike'}
                    color={'primary_5050'}
                  />
                  <Button.Standard
                    disabled={disable}
                    onPress={() => onPressRate('positive')}
                    width={'48%'}
                    icon={'Like'}
                  />
                </Styled.FlexWrapper>
              )}
            </>
          )}

          {!loading && isListEmpty && (
            <EmptyView>
              <Typography.H4 mBottom={'30px'} align={'center'}>
                {isFavorite ? t('favorite_empty') : t('question_empty')}
              </Typography.H4>
            </EmptyView>
          )}
        </Styled.FlexWrapper>
      </BottomBar> */}
    </>
  )
}
