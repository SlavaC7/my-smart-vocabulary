// providers/SwrCacheProvider.tsx
import { useEffect, useState } from 'react'
import { AppState } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { Cache, State } from 'swr'

export const useSwrCache = () => {
  const [cache, setCache] = useState<Cache | null>(null)

  useEffect(() => {
    let isMounted = true
    const map = new Map<string, unknown>()

    const initializeCache = async () => {
      try {
        const storedData = await AsyncStorage.getItem('swr-cache')
        if (storedData) {
          const parsedData = JSON.parse(storedData)
          parsedData.forEach(([key, value]: [string, unknown]) => {
            // Only restore persisted keys
            if (
              key.startsWith('["persisted"') ||
              (typeof key === 'string' && key.includes('"__persist":true'))
            ) {
              map.set(key, value)
            }
          })
        }

        if (isMounted) {
          setCache({
            get: (key: string) => map.get(key) as State<unknown>,
            set: (key: string, value: unknown) => {
              // Only persist if marked
              if (
                key.includes('persisted') ||
                (typeof key === 'string' && key.includes('"__persist":true'))
              ) {
                return map.set(key, value)
              }
              return map.set(key, value)
            },
            delete: (key: string) => map.delete(key),
            keys: () => map.keys(),
          })
        }
      } catch (error) {
        console.error('Failed to initialize SWR cache:', error)
      }
    }

    const saveCache = async () => {
      try {
        // Only save persisted entries
        const entries = Array.from(map.entries()).filter(
          ([key]) =>
            key.includes('persisted') ||
            (typeof key === 'string' && key.includes('"__persist":true')),
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
