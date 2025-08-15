import { useWordStore } from '../../store'

export const useWordControl = () => {
  const { words } = useWordStore()

  const existInAnyFolder = (wordText: string) => {
    return !!words.find(item => item.text === wordText)
  }
  return { existInAnyFolder }
}
