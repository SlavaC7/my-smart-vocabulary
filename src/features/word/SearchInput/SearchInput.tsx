import React, { useState, useEffect } from 'react'

import { useTranslation } from 'react-i18next'

import { Input, Styled } from '@/shared'

import { TSearchInputProps } from './types'

const useDebounce = (value: string, delay: number): string => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

export const SearchInput = ({
  value: initialValue = '',
  onChange,
  ...props
}: TSearchInputProps) => {
  const { t } = useTranslation()
  const [value, setValue] = useState(initialValue)
  const debouncedValue = useDebounce(value, 500)

  useEffect(() => {
    onChange?.(debouncedValue)
  }, [debouncedValue])

  return (
    <Styled.FlexWrapper {...props}>
      <Input.Standard
        style={{ flex: 1 }}
        leftIcon="Search"
        onChange={setValue}
        value={value}
        placeholder={t('search.placeholder')}
      />

      {/* <S.SpeechContainer>
        <WordFeature.SpeechToText onChange={setValue} />
      </S.SpeechContainer> */}
    </Styled.FlexWrapper>
  )
}
