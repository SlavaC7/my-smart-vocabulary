import React from 'react'

import { StatusBar, StyleSheet, View } from 'react-native'

import { useTheme } from 'styled-components'

import { AuthFeature } from '@/features'

import { hp, Icon, Styled, useNavigation, wp } from '@/shared'
import { Background } from '@/shared/ui/background'

export const CreateProfile = () => {
  const { COLORS } = useTheme()
  const { goBack } = useNavigation()

  return (
    <>
      <Background.Container color={COLORS.background}>
        <StatusBar barStyle="dark-content" />
        <Background.Scroll pHorizontal={16}>
          <Styled.FlexWrapper mBottom="20px" mTop="16px" justify="flex-start">
            <Styled.Touchable onPress={goBack} width="auth">
              <Icon name="AngleArrowLeftBlack" />
            </Styled.Touchable>
          </Styled.FlexWrapper>

          <AuthFeature.CreateProfileForm />
        </Background.Scroll>
      </Background.Container>
      <View style={styles.bottom}>
        <Icon name={'BottomAuth'} width={wp(100)} height={230} />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  bottom: {
    position: 'absolute',
    top: hp(100) - 200,
  },
})
