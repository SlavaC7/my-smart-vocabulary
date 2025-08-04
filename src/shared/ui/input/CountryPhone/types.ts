import { TMargin } from '../../utils'
import { TStandardInputProps } from '../Standard/types'

export type TExampleNumber = {
  country: string
  countryCallingCode: string
  getMetadata: () => {}
  nationalNumber: string
  number: string
}

export type TCountryPhoneProps = {
  onChange?: (text: string) => void
  value?: string
  error?: string
  disabled?: boolean
  placeholder?: string
  inputProps?: Partial<TStandardInputProps>
  label?: string
} & TMargin
