// hooks/api/useApi.ts
import { AxiosError, AxiosResponse } from 'axios'
import useSWR, { KeyedMutator, SWRConfiguration } from 'swr'

type TResponse<T> = AxiosResponse<T>

type ApiFunction<T, P = undefined> = [P] extends [undefined]
  ? () => Promise<TResponse<T>>
  : (payload: P) => Promise<TResponse<T>>

const generateKey = <T, P>(
  fn: ApiFunction<T, P>,
  payload?: P,
  persist?: boolean,
): string | Array<unknown> => {
  const baseKey = fn.name || fn.toString()
  if (persist) {
    return ['persisted', baseKey, payload]
  }
  return payload ? [baseKey, payload] : baseKey
}

const unwrapResponse = async <T,>(
  response: Promise<TResponse<T>>,
): Promise<T> => {
  const result = await response
  return result.data
}

// Overload signatures
export function useApiQuery<T, P = undefined>(
  fetcher: ApiFunction<T, P>,
  options?: SWRConfiguration & {
    enabled?: boolean
    payload?: P
    persist?: boolean
  },
): {
  data: T | undefined
  error: AxiosError | undefined
  isLoading: boolean
  isValidating: boolean
  mutate: KeyedMutator<T>
}

export function useApiQuery<T, P = undefined>(
  key: string | Array<unknown>,
  fetcher: ApiFunction<T, P>,
  options?: SWRConfiguration & {
    enabled?: boolean
    payload?: P
    persist?: boolean
  },
): {
  data: T | undefined
  error: AxiosError | undefined
  isLoading: boolean
  isValidating: boolean
  mutate: KeyedMutator<T>
}

export function useApiQuery<T, P = undefined>(
  keyOrFetcher: string | Array<unknown> | ApiFunction<T, P>,
  fetcherOrOptions?:
    | ApiFunction<T, P>
    | (SWRConfiguration & {
        enabled?: boolean
        payload?: P
        persist?: boolean
      }),
  options?: SWRConfiguration & {
    enabled?: boolean
    payload?: P
    persist?: boolean
  },
) {
  const actualFetcher =
    typeof keyOrFetcher === 'function'
      ? keyOrFetcher
      : (fetcherOrOptions as ApiFunction<T, P>)

  const actualOptions =
    typeof keyOrFetcher === 'function'
      ? (fetcherOrOptions as SWRConfiguration & {
          enabled?: boolean
          payload?: P
          persist?: boolean
        })
      : options

  const {
    enabled = true,
    payload,
    persist = false,
    ...swrOptions
  } = actualOptions || {}

  const actualKey =
    typeof keyOrFetcher === 'function'
      ? generateKey(keyOrFetcher, payload, persist)
      : persist
      ? [
          'persisted',
          ...(Array.isArray(keyOrFetcher) ? keyOrFetcher : [keyOrFetcher]),
        ]
      : keyOrFetcher

  const { data, error, isLoading, isValidating, mutate } = useSWR<
    T,
    AxiosError
  >(
    enabled
      ? Array.isArray(actualKey)
        ? [...actualKey, payload]
        : payload
        ? [actualKey, payload]
        : actualKey
      : null,
    () =>
      unwrapResponse(
        payload !== undefined
          ? actualFetcher(payload)
          : (actualFetcher as () => Promise<TResponse<T>>)(),
      ),
    {
      revalidateOnFocus: false,
      ...swrOptions,
    },
  )

  return {
    data,
    error,
    isLoading,
    isValidating,
    mutate,
  }
}
