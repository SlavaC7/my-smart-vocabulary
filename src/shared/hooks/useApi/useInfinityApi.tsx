// hooks/api/useInfiniteApiQuery.ts
import { useCallback, useMemo } from 'react'
import React from 'react'
import { ActivityIndicator, RefreshControl } from 'react-native'

import { AxiosError, AxiosResponse } from 'axios'
import useSWRInfinite, { SWRInfiniteConfiguration } from 'swr/infinite'

import { Styled } from '@/shared/ui/styled'

type PaginatedResponse<T> = {
  docs: T[]
  totalCount: number
  [key: string]: unknown // Allow additional properties
}

type TResponse<T> = AxiosResponse<PaginatedResponse<T>>

type ApiFunction<T, P = {}> = (
  payload: P & { skip: number; limit: number },
) => Promise<TResponse<T>> | Promise<PaginatedResponse<T>>

const unwrapPaginatedResponse = async <T,>(
  response: Promise<TResponse<T>> | Promise<PaginatedResponse<T>>,
): Promise<PaginatedResponse<T>> => {
  const result = await response
  if (typeof result === 'object' && result !== null && 'data' in result) {
    return (result as TResponse<T>).data
  }
  return result as PaginatedResponse<T>
}

export const useInfiniteApiQuery = <T, P = {}>(
  fetcher: ApiFunction<T, P>,
  options?: SWRInfiniteConfiguration & {
    initialSize?: number
    limit?: number
    payload?: P
    onLoadMore?: (nextSkip: number) => void
    refreshControlColor?: string
    persist?: boolean
  },
) => {
  const {
    initialSize = 1,
    limit = 10,
    payload,
    onLoadMore,
    refreshControlColor = '#000000',
    persist = false,
    ...swrOptions
  } = options || {}

  const getKey = (
    pageIndex: number,
    previousPageData: PaginatedResponse<T> | null,
  ) => {
    if (previousPageData && previousPageData.docs.length < limit) return null
    const skip = pageIndex * limit
    const keyData = {
      fetcherName: fetcher.name,
      ...payload,
      skip,
      limit,
    }
    return persist
      ? JSON.stringify({ ...keyData, __persist: true })
      : JSON.stringify(keyData)
  }

  const { data, error, size, setSize, mutate, isValidating, isLoading } =
    useSWRInfinite<PaginatedResponse<T>, AxiosError>(
      getKey,
      async (key: string) => {
        const parsedKey = JSON.parse(key)
        const { fetcherName, ...cleanPayload } = parsedKey
        return unwrapPaginatedResponse(fetcher(cleanPayload))
      },
      {
        initialSize,
        revalidateFirstPage: false,
        ...swrOptions,
      },
    )

  // Data helpers
  const docs = data?.flatMap(page => page?.docs ?? []) ?? []
  const totalCount = data?.[0]?.totalCount ?? 0

  // Loading states
  const isLoadingInitialData = !data && !error
  const currentPageData = data?.[size - 1]
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && !currentPageData) ||
    (isValidating && size > (data?.length ?? 0))

  // Pagination states
  const isEmpty = docs.length === 0
  const lastPage = data?.[data.length - 1]
  const isReachingEnd =
    isEmpty ||
    (lastPage && lastPage.docs?.length < limit) ||
    (totalCount > 0 && docs.length >= totalCount)

  const hasMore = !isReachingEnd && !isLoadingMore

  // Action handlers
  const loadMore = () => {
    if (!isLoadingMore && !isReachingEnd) {
      const nextSkip = size * limit
      setSize(size + 1)
      onLoadMore?.(nextSkip)
    }
  }

  const refresh = useCallback(async () => {
    await mutate()
  }, [mutate])

  // FlatList related callbacks
  const onEndReached = useCallback(() => {
    if (hasMore) loadMore()
  }, [hasMore, loadMore])

  const ListFooterComponent = useCallback(() => {
    if (isLoadingMore && hasMore) {
      return (
        <Styled.FlexWrapper mTop="16px" mBottom="16px">
          <ActivityIndicator size="small" color={refreshControlColor} />
        </Styled.FlexWrapper>
      )
    }
    return null
  }, [isLoadingMore, hasMore, refreshControlColor])

  const refreshControl = useMemo(
    () => (
      <RefreshControl
        onRefresh={refresh}
        refreshing={isValidating && !isLoadingMore}
        tintColor={refreshControlColor}
      />
    ),
    [refresh, isValidating, isLoadingMore, refreshControlColor],
  )

  return {
    docs,
    totalCount,
    error,
    isLoadingMore,
    isReachingEnd,
    isEmpty,
    loadMore,
    mutate,
    refresh,
    currentPage: size,
    currentSkip: (size - 1) * limit,
    isValidating,
    isLoading,
    // Additional metadata
    hasMore,
    pageCount: size,
    pageSize: limit,
    // FlatList props
    flatListProps: {
      showsVerticalScrollIndicator: false,
      onEndReached,
      ListFooterComponent,
      refreshControl,
      onEndReachedThreshold: 0.5,
    },
  }
}
