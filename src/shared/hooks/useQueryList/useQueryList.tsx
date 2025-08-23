import { useState, useCallback, useEffect } from 'react'

import { useIsFocused } from '@react-navigation/native'

import { TQueryListData } from '@/shared/api/types'
import { errorHandler } from '@/shared/lib'

import { usePagination } from '../usePagination'

type TActionResult<T> = {
  data: TQueryListData<T>
}

type TDefProps = {
  disableInitialCall?: boolean
  debug?: string
  getOnFocused?: boolean
}

export const useQueryList = <T, P>(
  action: (params: P) => Promise<TActionResult<T>>,
  { disableInitialCall, debug, getOnFocused = false, ...props }: P & TDefProps,
) => {
  const isFocused = useIsFocused()
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [totalCount, setTotalCount] = useState(0)

  const getAction = useCallback(
    async (skip: number) => {
      try {
        setLoading(true)
        if (debug) {
          console.log(`[${debug}] getAction: `, { limit: 10, skip, ...props })
        }

        const result = await action({ limit: 10, skip, ...props } as P)
        if (debug) {
          console.log(`[${debug}] result: `, result.data)
        }

        const docs = result.data?.docs || []
        setData(prev => (skip ? [...prev, ...docs] : docs))
        setTotalCount(result.data?.totalCount || 0)
      } catch (error) {
        errorHandler({
          name: `useQueryList [${debug || 'none'}] `,
          error,
        })
      }

      setLoading(false)
    },
    [action, props, debug],
  )

  const paginationProps = usePagination({
    getAction: getAction,
    loading,
    items: data,
    totalCount,
  })

  useEffect(() => {
    setLoading(false)

    if (!disableInitialCall) {
      getAction(0)
    }
  }, [Object.values(props || {}).join(), disableInitialCall])

  useEffect(() => {
    if (getOnFocused && isFocused) {
      paginationProps.getFirstPage()
    }
  }, [getOnFocused, isFocused])

  return {
    data,
    totalCount,
    loading,
    setData,
    setTotalCount,
    ...paginationProps,
  }
}
