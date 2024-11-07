import React, { createContext, useMemo } from 'react'

import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ThemeProvider } from 'styled-components'

import { TThemeContextProps, TThemeProps } from './types'

export const ThemeContext = createContext<TThemeContextProps>({})

export const ThemeWrapper = ({ children }: TThemeProps) => {
  const { top, bottom } = useSafeAreaInsets()

  const value = useMemo(
    () => ({ instTop: top, instBottom: bottom }),
    [top, bottom],
  )

  return (
    <ThemeContext.Provider value={{}}>
      <ThemeProvider theme={value}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  )
}

//This logic fir change theme

// const [theme, setTheme] = useState<ETheme>(ETheme.black)

//   useEffect(() => {
//     Service.Theme.getTheme().then(
//       response => response && setTheme(response as ETheme),
//     )
//   }, [])

//   useEffect(() => {
//     Service.Theme.setTheme(theme)
//   }, [theme])

//   const value = useMemo(() => ({ theme, setTheme }), [theme])

//   const isWhite = theme === ETheme.white
