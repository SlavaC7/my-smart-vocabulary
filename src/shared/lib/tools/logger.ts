import { Platform } from 'react-native'

import { SENTRY_DNS } from '@env'
import { getFocusedRouteNameFromRoute, Route } from '@react-navigation/native'
import * as Sentry from '@sentry/react-native'
import DeviceInfo from 'react-native-device-info'

import { EScreens, Navigation } from '@/app/navigation'

export enum LogLevel {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  DEBUG = 'debug',
}

export interface ILogMessage {
  level: LogLevel
  message: string
  module?: string
  screen?: string
  metadata?: Record<string, unknown>
  timestamp: string
}

const getCurrentScreenName = (): string | undefined => {
  try {
    const state = Navigation.ref.getState()
    let currentRoute = state.routes[state.index]

    while (currentRoute.state) {
      currentRoute = currentRoute.state.routes[
        currentRoute.state.index as number
      ] as Route<EScreens>
    }

    const focusedScreen = ((
      getFocusedRouteNameFromRoute(currentRoute) ??
      currentRoute.name.replace('Stack', 'Main')
    ).replace('Screen', '') + 'Screen') as EScreens
    return focusedScreen
  } catch {}
  return undefined
}

const getDeviceMetadata = () => ({
  deviceModel: DeviceInfo.getModel(),
  osVersion: Platform.Version,
  platform: Platform.OS,
  appVersion: DeviceInfo.getVersion(),
})

const getTimestamp = () => new Date().toISOString()

const getConsoleStyle = (level: LogLevel) => {
  const styles = {
    [LogLevel.ERROR]: 'color: red; font-weight: bold;',
    [LogLevel.WARN]: 'color: orange; font-weight: bold;',
    [LogLevel.INFO]: 'color: lightblue;',
    [LogLevel.DEBUG]: 'color: green;',
  }
  return styles[level]
}

const logToConsole = (msg: ILogMessage) => {
  if (__DEV__ || msg.level === LogLevel.ERROR) {
    const style = getConsoleStyle(msg.level)
    const moduleInfo = msg.module ? `[${msg.module}]` : ''
    const screenInfo = msg.screen ? `[${msg.screen}]` : ''

    console.log(
      `%c${
        msg.timestamp
      } ${msg.level.toUpperCase()} ${moduleInfo}${screenInfo}: ${msg.message}`,
      style,
    )

    if (msg.metadata) {
      console.log('Metadata:', msg.metadata)
    }
  }
}

const logToSentry = (msg: ILogMessage) => {
  if (
    !__DEV__ &&
    (msg.level === LogLevel.ERROR || msg.level === LogLevel.WARN)
  ) {
    Sentry.withScope(scope => {
      scope.setLevel(msg.level === LogLevel.ERROR ? 'error' : 'warning')

      scope.setContext('logger', {
        module: msg.module,
        screen: msg.screen,
        timestamp: msg.timestamp,
      })

      scope.setContext('device', getDeviceMetadata())

      if (msg.metadata) {
        Object.entries(msg.metadata).forEach(([key, value]) => {
          scope.setExtra(key, value)
        })
      }

      if (msg.level === LogLevel.ERROR) {
        Sentry.captureException(new Error(msg.message))
      } else {
        Sentry.captureMessage(msg.message)
      }
    })
  }
}

// const logToLogRocket = (msg: ILogMessage) => {
//   if (LogRocket && !__DEV__) {
//     const logrocketMessage = {
//       ...msg,
//       device: getDeviceMetadata(),
//     }

//     switch (msg.level) {
//       case LogLevel.ERROR:
//         LogRocket.error(msg.message, logrocketMessage)
//         break
//       case LogLevel.WARN:
//         LogRocket.warn(msg.message, logrocketMessage)
//         break
//       case LogLevel.INFO:
//         LogRocket.info(msg.message, logrocketMessage)
//         break
//       case LogLevel.DEBUG:
//         LogRocket.debug(msg.message, logrocketMessage)
//         break
//     }
//   }
// }

const logMessage = (
  level: LogLevel,
  message: string,
  module?: string,
  metadata?: Record<string, unknown>,
) => {
  const screen = getCurrentScreenName()
  const msg: ILogMessage = {
    level,
    message,
    module,
    screen,
    metadata,
    timestamp: getTimestamp(),
  }

  logToConsole(msg)
  logToSentry(msg)
  // logToLogRocket(msg)
}

export const getLogger = (moduleName?: string) => {
  return {
    error: (message: string, metadata?: Record<string, unknown>) => {
      logMessage(LogLevel.ERROR, message, moduleName, metadata)
    },
    warn: (message: string, metadata?: Record<string, unknown>) => {
      logMessage(LogLevel.WARN, message, moduleName, metadata)
    },
    info: (message: string, metadata?: Record<string, unknown>) => {
      logMessage(LogLevel.INFO, message, moduleName, metadata)
    },
    debug: (message: string, metadata?: Record<string, unknown>) => {
      if (__DEV__) {
        logMessage(LogLevel.DEBUG, message, moduleName, metadata)
      }
    },
  }
}

export const logError = (
  error: unknown,
  context?: string,
  additionalMetadata?: Record<string, unknown>,
) => {
  const logger = getLogger(context)
  const screen = getCurrentScreenName()

  if (error instanceof Error) {
    logger.error(error.message, {
      errorName: error.name,
      stack: error.stack,
      screen,
      ...additionalMetadata,
    })
  } else {
    logger.error(String(error), {
      screen,
      ...additionalMetadata,
    })
  }
}

export const initializeLogging = (userId?: string) => {
  Sentry.init({
    dsn: SENTRY_DNS,
    environment: __DEV__ ? 'development' : 'production',
  })

  //   LogRocket.init(LOGROCKET_KEY)

  if (userId) {
    Sentry.setUser({ id: userId })
    // LogRocket.identify(userId)
  }
}

export const logger = getLogger('App')
