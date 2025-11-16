import { countryCodes } from 'react-native-country-codes-picker'

export const getFlag = (country: string) => {
  return countryCodes.find(el => el.code === country)?.flag
}
