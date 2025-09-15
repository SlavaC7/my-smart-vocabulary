import DeviceInfo from 'react-native-device-info'

import { isIos } from '../config'

export const appVersion = `${DeviceInfo.getVersion()}${
  isIos
    ? ` (${DeviceInfo.getBuildNumber()})`
    : `.${DeviceInfo.getBuildNumber()}`
}`
