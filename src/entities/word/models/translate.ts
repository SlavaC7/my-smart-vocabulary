export type TTranslationExample = {
  id: number
  source: string
  target: string
  source_phrases: Array<{
    phrase: string
    offset: number
    length: number
  }>
  target_phrases: Array<{
    phrase: string
    offset: number
    length: number
  }>
}

export type TTranslationContext = {
  examples: TTranslationExample[]
  rude: boolean
}

export type TTranslation = {
  ok: boolean
  text: string
  source: string
  target: string
  translations: string[]
  detected_language: string
  voice: string
  context: TTranslationContext
}

export type TSynonym = {
  id: number
  synonym: string
}

export type TSynonyms = {
  ok: boolean
  text: string
  source: string
  synonyms: TSynonym[]
}
