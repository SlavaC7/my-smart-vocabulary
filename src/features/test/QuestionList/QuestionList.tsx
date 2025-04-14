import React, { useCallback, useEffect, useRef, useState } from 'react'

import { Dimensions, ListRenderItem } from 'react-native'

import Carousel, { CarouselProperties } from 'react-native-snap-carousel'

import { useTypedSelector } from '@/app/store'

import { getTestSelector, TTestItem } from '@/entities/test'

import { Background } from '@/shared'

import { QuestionCard } from '../QuestionCard'

import { PurpleContainer } from './styled'
import { TQuestionListProps } from './types'

const { width: viewportWidth, height } = Dimensions.get('window')

export const QuestionList = ({}: TQuestionListProps) => {
  const { test } = useTypedSelector(getTestSelector)
  // const ref = useRef<Carousel<TTestItem>>(null)
  const [disable, setDisable] = useState<boolean>(false)

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

  const renderItem: ListRenderItem<TTestItem> = useCallback(({ item }) => {
    return <QuestionCard {...item} />
  }, [])

  return (
    <>
      {/* <Header.Question
        question={currentList.find(item => item.id === viewedId)}
        totalCount={totalCount}
        activeItem={activeIndex + 1}
      /> */}
      <PurpleContainer />

      <Background.Standard color={'transparent'}>
        <Carousel
          data={test}
          renderItem={renderItem}
          // onSnapToItem={setActiveSlide}
          pagingEnabled
          // ListEmptyComponent={renderEmpty}
          {...sliderParams}
        />
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
