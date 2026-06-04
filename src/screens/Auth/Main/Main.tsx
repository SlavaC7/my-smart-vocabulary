import React from 'react'

import { StatusBar, StyleSheet, View } from 'react-native'

import { useTheme } from 'styled-components'

import { AuthFeature } from '@/features'

import { hp, Icon, wp } from '@/shared'
import { Background } from '@/shared/ui/background'

export const Main = () => {
  const { COLORS } = useTheme()

  return (
    <>
      <Background.Container color={COLORS.background}>
        <StatusBar barStyle={'dark-content'} />
        <Background.Standard pHorizontal={16}>
          <AuthFeature.PhoneAuth />

          <AuthFeature.SocialAuth />
        </Background.Standard>
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
