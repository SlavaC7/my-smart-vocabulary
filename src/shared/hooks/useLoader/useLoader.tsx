import { useContext, useEffect } from 'react'

import { useIsFocused } from '@react-navigation/native'

import { LoaderContext } from '@/app/contexts/Loader'

type TUseLoaderProps = {
  shouldClear?: boolean
} | void

export const useLoader = (props: TUseLoaderProps) => {
  const data = useContext(LoaderContext)
  const isFocused = useIsFocused()

  const { shouldClear = true } = props || {}

  useEffect(() => {
    if (!isFocused && shouldClear) {
      data?.setLoading(false)
    }
  }, [isFocused])

  useEffect(() => {
    return () => {
      data?.setLoading(false)
    }
  }, [])

  return { ...data }
}
