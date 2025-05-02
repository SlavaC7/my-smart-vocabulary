export const langsArray: TLangArray[] = [
  {
    code: 'IT',
    flag: '🇮🇹',
  },
  {
    code: 'US',
    flag: '🇺🇸',
  },
]

export const availableLang: TAvailableLang[] = ['US', 'IT']

export type TAvailableLang = 'US' | 'IT'

export type TLangArray = {
  code: TAvailableLang
  flag: string
}
