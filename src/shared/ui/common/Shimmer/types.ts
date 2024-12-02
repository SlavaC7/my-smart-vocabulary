import { PropsWithChildren } from 'react'

export type TShimmerProps = {
  width?: number | string
  height?: number | string
  borderRadius?: number
}

export type TShimmerWrapperProps = PropsWithChildren<
  TShimmerProps & { loading: boolean }
>
