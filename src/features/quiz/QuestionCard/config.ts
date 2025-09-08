import { Dimensions } from 'react-native'

export const { width, height } = Dimensions.get('window')

export const CARD_WIDTH = width - 32
export const CARD_HEIGHT = height * 0.7
export const CARD_BORDER_RADIUS = 16

export const CIRCLE_RADIUS = 50
export const CENTER_CIRCLE = CARD_WIDTH / 2
