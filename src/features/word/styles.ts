import LottieView from 'lottie-react-native'
import styled from 'styled-components/native'

import { EColors, hp } from '@/shared'
import { Touchable } from '@/shared/ui/styled/Styled'

export const Container = styled.View`
  width: 100%;
  padding: 24px;
  border-radius: 33px;
  background-color: ${EColors.white};
  justify-content: space-between;
  flex: 1;
  align-items: center;
`

export const StyledTextArea = styled.TextInput.attrs({
  showsVerticalScrollIndicator: false,
})`
  /* height: ${hp(4)}px; */
  flex: 1;
  margin-bottom: 10px;
  width: 100%;
  font-style: italic;
  font-size: 16px;
  color: ${EColors.text};
  vertical-align: top;
`

export const Buttons = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

export const ButtonWrapper = styled.View<{
  isMain?: boolean
  invisible?: boolean
}>`
  align-items: center;
  justify-content: center;
  width: 48%;
  height: 100px;
  /* opacity: ${({ invisible }) => (!!invisible ? 0 : 1)}; */
  /* ${props => props.isMain && 'flex: 1; width:100%; padding: 0px 16px'} */
`

export const SideButton = styled(Touchable)`
  height: 64px;
  width: 64px;
  background-color: ${EColors.grey_opacity};
  border-radius: 64px;
`

export const ControllButton = styled(Touchable)<{ isRecording?: boolean }>`
  width: 100%;
  height: 64px;
  border-radius: 64px;
  background-color: ${({ isRecording }) =>
    isRecording ? EColors.primary : EColors.grey_opacity};
  align-items: center;
  justify-content: center;
`

export const LottieTouchable = styled(Touchable)<{ containerHeight: number }>`
  position: absolute;
  top: ${({ containerHeight }) => containerHeight / 11}px;
  z-index: 20;
`

export const StyledLottie = styled(LottieView)<{ containerHeight: number }>`
  height: ${({ containerHeight }) => containerHeight / 3}px;
  width: ${({ containerHeight }) => containerHeight / 3}px;
  position: absolute;
  z-index: 20;
  top: 15%;
`
