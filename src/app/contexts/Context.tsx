import React, { ReactNode } from 'react'

import { StyleSheet } from 'react-native'

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import { SafeAreaProvider } from 'react-native-safe-area-context'

import { LanguageProvider } from './Language'
import { LoaderWrapper } from './Loader'
import { ThemeWrapper } from './Theme'
import { ToastWrapper } from './Toast'

type TContext = {
  children: ReactNode
}

export const Contexts = ({ children }: TContext) => {
  return (
    <>
      {/*  SaveAreaView */}
      <SafeAreaProvider>
        {/* GestureHandler */}
        <GestureHandlerRootView style={styles.gestureHandlerContainer}>
          <ThemeWrapper>
            {/* Loader */}
            <LoaderWrapper>
              {/* Language */}
              <LanguageProvider>
                {/* Toast */}
                <ToastWrapper>
                  <BottomSheetModalProvider>
                    {children}
                  </BottomSheetModalProvider>
                </ToastWrapper>
              </LanguageProvider>
            </LoaderWrapper>
          </ThemeWrapper>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </>
  )
}

const styles = StyleSheet.create({
  gestureHandlerContainer: {
    flex: 1,
  },
})
