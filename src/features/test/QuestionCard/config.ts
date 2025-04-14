import { Dimensions } from 'react-native'

import { isIos } from '@/shared'

export const { width, height } = Dimensions.get('window')

export const CARD_WIDTH = width - 32
export const CARD_HEIGHT = height * (isIos ? 0.6 : 0.65)
export const CARD_BORDER_RADIUS = 16

export const CIRCLE_RADIUS = 50
export const CENTER_CIRCLE = CARD_WIDTH / 2
