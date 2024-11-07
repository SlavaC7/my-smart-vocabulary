import { useContext } from 'react'

import { LoaderContext } from './Loader'

export const useLoader = () => {
  const { setLoading, loader } = useContext(LoaderContext)

  const onShow = () => {
    setLoading(true)
  }

  const onHide = () => {
    setLoading(false)
  }

  return {
    onShow,
    onHide,
    loader,
  }
}
