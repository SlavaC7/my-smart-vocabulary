import { PermissionsAndroid, Platform } from 'react-native'

export const checkStoragePermission = async () => {
  if (
    Platform.OS === 'ios' ||
    (Platform.OS === 'android' && Platform.Version >= 33)
  ) {
    return true
  } else {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission Required',
          message: 'This app needs access to your storage to download Photos',
          buttonPositive: 'OK',
          buttonNegative: 'CANCEL',
        },
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true
      } else {
        return false
      }
    } catch (err) {
      return false
    }
  }
}
