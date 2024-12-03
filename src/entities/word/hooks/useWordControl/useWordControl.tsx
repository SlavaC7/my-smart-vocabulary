import { useTypedSelector } from '@/app/store'

import { getWordSelector } from '../../store'

export const useWordControl = () => {
  const { words } = useTypedSelector(getWordSelector)

  const existInAnyFolder = (wordText: string) => {
    return !!words.find(item => item.text === wordText)
  }
  return { existInAnyFolder }
}
