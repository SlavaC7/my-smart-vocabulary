import React, { ReactNode } from 'react'

import { StyleSheet } from 'react-native'

import { GestureHandlerRootView } from 'react-native-gesture-handler'

import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'

import { PersistGate } from 'redux-persist/integration/react'

import { persistor, store } from '../store'

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
      {/*  Redux */}
      <Provider store={store}>
        {/* Persist store */}
        <PersistGate loading={null} persistor={persistor}>
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
                    <ToastWrapper>{children}</ToastWrapper>
                  </LanguageProvider>
                </LoaderWrapper>
              </ThemeWrapper>
            </GestureHandlerRootView>
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    </>
  )
}

const styles = StyleSheet.create({
  gestureHandlerContainer: {
    flex: 1,
  },
})
