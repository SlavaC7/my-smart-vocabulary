import React, { useMemo } from 'react'

import { TouchableOpacity } from 'react-native'

import { useNavigation } from '@/shared/hooks'
import { Icon } from '@/shared/ui/Icon'
import { EColors, Styled, Typography } from '@/shared/ui/styled'

import { Wrapper } from '../Wrapper'

import { styles } from './styles'
import { ETitleAlign, TStandardProps } from './types'

export const Standard = ({
  title = '',
  goBack = false,
  icon,
  iconProps = {},
  onPress,
  onGoBack,
  backIconProps = {},
  rightAction,
  leftAction,
  titleAlign = ETitleAlign.center,
  TitleComponent = Typography.H3,
  ...props
}: TStandardProps) => {
  const navigation = useNavigation()

  const _onGoBack = () => {
    if (onGoBack) {
      onGoBack()

      return
    }

    navigation.goBack()
  }

  const _leftAction = useMemo(() => {
    if (leftAction) {
      return leftAction
    }

    return (
      <>
        {goBack && (
          <TouchableOpacity style={styles.touch} onPress={_onGoBack}>
            <Icon
              name="ArrowLeft"
              stroke={EColors.black}
              size={24}
              {...backIconProps}
            />
          </TouchableOpacity>
        )}

        {titleAlign === ETitleAlign.center && !goBack && (
          <Styled.Divider width={24} />
        )}
      </>
    )
  }, [goBack, _onGoBack, backIconProps, titleAlign, leftAction])

  return (
    <Wrapper {...props}>
      <Styled.FlexWrapper style={styles.main} justify={'space-between'}>
        {titleAlign === ETitleAlign.center && _leftAction}

        <Styled.FlexWrapper width={'auto'} height={'100%'}>
          {titleAlign === ETitleAlign.start && _leftAction}
          <TitleComponent>{title}</TitleComponent>
        </Styled.FlexWrapper>

        {icon && (
          <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
            <Icon name={icon} {...iconProps} size={24} />
          </TouchableOpacity>
        )}

        {rightAction || <></>}
        {!icon && !rightAction && <Styled.Divider width={goBack ? 24 : 0} />}
      </Styled.FlexWrapper>
    </Wrapper>
  )
}
