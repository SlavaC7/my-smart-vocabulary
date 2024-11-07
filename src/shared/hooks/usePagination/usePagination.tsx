import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { ActivityIndicator, RefreshControl } from 'react-native'

import { useTranslation } from 'react-i18next'

import { EColors, Styled } from '@/shared/ui'

export type TPaginationGetAction = (skip: number) => Promise<void>

type TUsePagination = {
  getAction: TPaginationGetAction
  loading: boolean
  items: Array<unknown>
  totalCount: number
  updateFunc?: unknown
}
/**
 *
 * @param getAction - function that implemente get logic. Please use memoization for that component
 * @param loading - loader state
 * @param items - Elements array from request
 * @param totalCount - Total Count elements
 * @param updateFunc - ONLY IF NEEDED! object to update getFirstPage, refresh and getMore functions
 *
 *
 */
export const usePagination = ({
  getAction,
  loading,
  items = [],
  totalCount,
  updateFunc = {},
}: TUsePagination) => {
  const { i18n } = useTranslation()
  const [isFirstLoad, setIsFirstLoad] = useState(true)
  const length = useMemo(() => items.length ?? 0, [items.length])

  const [refreshing, setRefreshing] = useState(false)

  const canGetMoreItems = useMemo(
    () => items.length < totalCount && items.length,
    [items.length, totalCount],
  )

  const loadMoreLoading = useMemo(
    () => (canGetMoreItems || loading) && !refreshing,
    [canGetMoreItems, loading, refreshing],
  )

  // Get more method
  const getMore = useCallback(() => {
    if (loading || !canGetMoreItems) return

    getAction(length)
  }, [loading, canGetMoreItems, getAction, length, updateFunc])

  // Get first page
  const getFirstPage = useCallback(() => {
    getAction(0).finally(() => setIsFirstLoad(false))
  }, [updateFunc])

  // Refresh
  const refresh = useCallback(() => {
    setRefreshing(true)
    getFirstPage()
  }, [updateFunc])

  // Effect for listen end of loading
  useEffect(() => {
    if (!loading) setRefreshing(false)
  }, [loading])

  // Get first page
  useEffect(() => {
    getFirstPage()
  }, [i18n.language])

  useEffect(() => {
    if (items.length) return
    setIsFirstLoad(true)
  }, [items])

  const onEndReached = useCallback(() => {
    if (canGetMoreItems) getMore()
  }, [canGetMoreItems, getMore])

  const ListFooterComponent = useCallback(() => {
    if (loadMoreLoading && canGetMoreItems) {
      return (
        <Styled.FlexWrapper mBottom={'16px'} mTop={'16px'}>
          <ActivityIndicator size="small" color={EColors.primary} />
        </Styled.FlexWrapper>
      )
    }
    return <></>
  }, [loadMoreLoading, canGetMoreItems])

  const refreshControl = useMemo(
    () => (
      <RefreshControl
        onRefresh={refresh}
        refreshing={refreshing}
        tintColor={EColors.primary}
      />
    ),
    [refreshing, refresh],
  )
  return {
    getMore,
    getFirstPage,
    isFirstLoad: isFirstLoad && !refreshing,
    canGetMoreItems,
    loadMoreLoading,
    refreshing,
    refresh,
    flatListProps: {
      showsVerticalScrollIndicator: false,
      onEndReached,
      ListFooterComponent,
      refreshControl,
    },
  }
}
