// providers/SwrCacheProvider.tsx
import { useEffect, useRef, useState } from 'react'
import { AppState } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { Cache, State } from 'swr'

const isPersistedKey = (key: string) =>
  key.startsWith('["persisted"') || key.includes('"__persist":true')

export const useSwrCache = () => {
  const mapRef = useRef(new Map<string, unknown>())

  // Cache object is created synchronously — never null
  const [cache] = useState<Cache>(() => ({
    get: (key: string) => mapRef.current.get(key) as State<unknown>,
    set: (key: string, value: unknown) => {
      mapRef.current.set(key, value)
    },
    delete: (key: string) => mapRef.current.delete(key),
    keys: () => mapRef.current.keys(),
  }))

  useEffect(() => {
    let isMounted = true

    const initializeCache = async () => {
      try {
        const storedData = await AsyncStorage.getItem('swr-cache')
        if (storedData && isMounted) {
          const parsedData = JSON.parse(storedData)
          parsedData.forEach(([key, value]: [string, unknown]) => {
            if (isPersistedKey(key)) {
              mapRef.current.set(key, value)
            }
          })
        }
      } catch (error) {
        console.error('Failed to initialize SWR cache:', error)
      }
    }

    const saveCache = async () => {
      try {
        const entries = Array.from(mapRef.current.entries()).filter(([key]) =>
          isPersistedKey(key),
        )
        await AsyncStorage.setItem('swr-cache', JSON.stringify(entries))
      } catch (error) {
        console.error('Failed to save SWR cache:', error)
      }
    }

    initializeCache()

    const subscription = AppState.addEventListener('change', state => {
      if (state === 'background') {
        saveCache()
      }
    })

    const interval = setInterval(saveCache, 10000)

    return () => {
      isMounted = false
      subscription.remove()
      clearInterval(interval)
      saveCache()
    }
  }, [])

  return cache
}
