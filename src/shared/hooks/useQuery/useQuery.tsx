import { useState, useCallback, useEffect } from 'react'

import { Sentry } from '@/shared/lib'

type TActionResult<T> = {
  data: T
}

type TDefProps<T> = {
  disableInitialCall?: boolean
  initialValue?: T
  debug?: boolean
}

export const useQuery = <T, P>(
  action: (params: P) => Promise<TActionResult<T>>,
  { disableInitialCall, debug, initialValue, ...props }: P & TDefProps<T>,
) => {
  const [data, setData] = useState<T | undefined>(initialValue)
  const [loading, setLoading] = useState<boolean>(true)

  const getAction = useCallback(async () => {
    try {
      setLoading(true)
      const result = await action(props as P)
      setData(result.data)
    } catch (e) {
      console.error(`useQuery [${debug || 'none'}] error:`, e)
      Sentry.captureException(e)
    }

    setLoading(false)
  }, [action, props, debug])

  useEffect(() => {
    if (!disableInitialCall) {
      getAction()
    }
  }, [Object.values(props || {}).join(), disableInitialCall])

  return {
    data,
    loading,
    getAction,
  }
}
