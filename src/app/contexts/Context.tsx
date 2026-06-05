import React, { ReactNode } from 'react'

import { StyleSheet } from 'react-native'

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import { SafeAreaProvider } from 'react-native-safe-area-context'

import { SWRConfig } from 'swr'

import { useSwrCache } from '@/shared/hooks/useApi/persist'

import { LanguageProvider } from './Language'
import { LoaderWrapper } from './Loader'
import { ThemeWrapper } from './Theme'
import { ToastWrapper } from './Toast'
import { KeyboardProvider } from 'react-native-keyboard-controller'

type TContext = {
  children: ReactNode
}

export const Contexts = ({ children }: TContext) => {
  const cache = useSwrCache()

  return (
    <>
      <SWRConfig value={{ provider: () => cache }}>
        {/*  SaveAreaView */}
        <SafeAreaProvider>
          {/* GestureHandler */}
          <GestureHandlerRootView style={styles.gestureHandlerContainer}>
            {/* KeyboardController */}
            <KeyboardProvider>
              {/* Theme */}
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
            </KeyboardProvider>
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </SWRConfig>
    </>
  )
}

const styles = StyleSheet.create({
  gestureHandlerContainer: {
    flex: 1,
  },
})
