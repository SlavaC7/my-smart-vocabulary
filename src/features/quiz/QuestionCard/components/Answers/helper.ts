import { TEColors } from '@/shared'

export const getCorrectTextColor = (
  isActive: boolean,
  thisAnswer: boolean,
  isCorrect: boolean,
  disabled: boolean,
): TEColors => {
  if (isActive && !thisAnswer) {
    return 'black'
  }

  if (thisAnswer) {
    if (isCorrect) {
      return 'black'
    }

    return 'black'
  } else if (disabled && isCorrect) {
    return 'black'
  }

  return 'neutral_600'
}
