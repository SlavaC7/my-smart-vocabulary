import { css } from 'styled-components'

import { EColors } from '../styled/colors'

import { EFonts } from './font'
import { TFlex, TFont, TMargin } from './types'

export const FONT = ({
  color = EColors.black,
  size = '16px',
  weight = '400',
  //Change font what you use
  font = EFonts.inter,
  align = 'left',
  style = 'normal',
}: TFont) => {
  return css`
    font-family: '${font}';
    color: ${color};
    font-size: ${size};
    font-weight: ${weight};
    text-align: ${align};
    font-style: ${style};
  `
}

export const MARGIN = ({
  mTop = '0px',
  mBottom = '0px',
  mRight = '0px',
  mLeft = '0px',
}: TMargin) => {
  return css`
    margin-top: ${mTop};
    margin-bottom: ${mBottom};
    margin-left: ${mLeft};
    margin-right: ${mRight};
  `
}

export const FLEX = ({
  direction = 'row',
  align = 'center',
  justify = 'center',
  wrap = 'nowrap',
}: TFlex) => {
  return `
    display: flex;
    flex-direction: ${direction};
    align-items: ${align};
    justify-content: ${justify};
    flex-wrap: ${wrap};
  `
}
