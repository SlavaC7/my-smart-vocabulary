import React from 'react'

import { Shimmer } from './Shimmer'
import { TShimmerWrapperProps } from './types'

export const ShimmerWrapper = ({
  loading,
  children,
  ...shimmerProps
}: TShimmerWrapperProps) => {
  return <>{loading ? <Shimmer {...shimmerProps} /> : <>{children}</>}</>
}
