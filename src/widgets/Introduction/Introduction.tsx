import React from 'react'

import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { EColors, Styled, Typography } from '@/shared/ui/styled'

export const Introduction = () => {
  return (
    <Styled.FlexWrapper
      flexDirection={'column'}
      justify={'flex-start'}
      height={'100%'}>
      <Typography.H1>H1</Typography.H1>
      <Typography.H2>H1</Typography.H2>
      <Typography.Body1SB>Body1SB</Typography.Body1SB>
      <Typography.Body1R>Body1R</Typography.Body1R>
      <Typography.Body2SB>Body2SB</Typography.Body2SB>
      <Typography.Body2R>Body2R</Typography.Body2R>
      <Typography.CaptionSB>CaptionSB</Typography.CaptionSB>
      <Typography.CaptionR>CaptionR</Typography.CaptionR>

      <Typography.Body2R mTop={'20px'}>Hr</Typography.Body2R>
      <Styled.Hr mBottom={'20px'} />

      <Input.Standard
        label={'Input with require'}
        placeholder={'placeholder'}
        mBottom={'16px'}
      />

      <Input.Standard
        label={'Input with error'}
        notRequired
        placeholder={'placeholder'}
        error={'Error'}
      />

      <Button.Standard text={'Button'} />

      <Button.Standard
        mTop={'16px'}
        width={'50%'}
        textColor={EColors.red}
        text={'Button 50%, and color'}
      />

      <Button.Standard mTop={'16px'}>
        <Typography.H2 color={EColors.white}>Button H1 text</Typography.H2>
      </Button.Standard>

      <Button.Standard
        iconProps={{
          fill: EColors.white,
        }}
        mTop={'16px'}
        icon={'Index'}
        text={'Button with icon'}
      />
    </Styled.FlexWrapper>
  )
}
