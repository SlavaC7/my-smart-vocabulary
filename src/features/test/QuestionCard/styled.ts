import { StyleSheet } from 'react-native'

import styled from 'styled-components'

import { Styled } from '@/shared'

import * as Sizes from './config'

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  containerPlaceholder: {
    alignItems: 'center',

    paddingHorizontal: 16,
  },
  backgroundLayer: {
    pointerEvents: 'none',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 10,
    zIndex: -1000,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 35,
    elevation: -8, // Для Android
  },
  text: {
    width: '100%',
  },
})

export const SmileContainer = styled(Styled.FlexWrapper).attrs({
  width: '80px',
  height: '80px',
})`
  background-color: ${({ theme: { COLORS } }) => COLORS.dark_yellow};
  border-radius: 100px;
  bottom: 20px;
`

export const SVGContainer = styled(Styled.FlexWrapper).attrs({
  width: `${Sizes.CARD_WIDTH}px`,
  height: `${Sizes.CARD_HEIGHT}px`,
})``

export const ContentContainer = styled(Styled.FlexWrapper).attrs({
  width: `${Sizes.CARD_WIDTH}px`,
  height: `${Sizes.CARD_HEIGHT}px`,
  flexDirection: 'column',
})`
  padding: 0px 70px;
  z-index: 2;
  position: absolute;
  bottom: 0px;
  left: 0px;
`

export const FavoriteContainer = styled(Styled.Touchable).attrs({
  width: 'auto',
})`
  z-index: 2;
  position: absolute;
  bottom: 10px;
  left: 10px;
`

export const Placeholder = styled(Styled.FlexWrapper).attrs({
  mBottom: '12px',
})`
  height: 25px;
  border-radius: 35px;
  background-color: ${({ theme: { COLORS } }) => COLORS.primary_200};
`
