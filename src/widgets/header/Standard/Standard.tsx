import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

import { useNavigation } from '@/shared/hooks'
import { Icon } from '@/shared/ui/Icon'

import { Styled, Typography } from '@/shared/ui/styled'

import { Header } from '..'

import { TStandardProps } from './types'

export const Standard = ({
  title = '',
  goBack,
  icon,
  iconProps = {},
  onPress,
  onGoBack,
}: TStandardProps) => {
  const navigation = useNavigation()

  const _onGoBack = () => {
    if (onGoBack) {
      onGoBack()

      return
    }
    navigation.goBack()
  }
  return (
    <>
      <Header.Container>
        <Styled.FlexWrapper
          height={'100%'}
          style={styles.main}
          justify={'space-between'}>
          <Styled.FlexWrapper width={'auto'}>
            {/* Go back button */}
            {goBack && (
              <TouchableOpacity style={styles.touch} onPress={_onGoBack}>
                <Icon name={'Back'} />
              </TouchableOpacity>
            )}

            {/* Title */}
            <Typography.H2 mLeft={goBack ? '10px' : '0px'}>
              {title}
            </Typography.H2>
          </Styled.FlexWrapper>

          {/* Icon */}
          {icon && (
            <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
              <Icon name={icon} {...iconProps} />
            </TouchableOpacity>
          )}
        </Styled.FlexWrapper>
      </Header.Container>
    </>
  )
}

const styles = StyleSheet.create({
  main: {
    paddingHorizontal: 16,
  },
  touch: {
    padding: 5,
  },
})
