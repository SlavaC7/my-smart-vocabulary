import React, { useState, useCallback, useEffect } from 'react'

import Voice from '@react-native-voice/voice'
import { useIsFocused } from '@react-navigation/native'
import { useTheme } from 'styled-components'

import { Icon, Styled } from '@/shared'

import { TSpeechToTextProps } from './types'

export const SpeechToText = ({
  onChange,
  disabled,
  ...props
}: TSpeechToTextProps) => {
  const { COLORS } = useTheme()
  const isFocused = useIsFocused()

  const [listen, setListen] = useState(false)

  const onStart = useCallback(() => {
    setListen(true)

    const onSpeechResults = (event: { value?: string[] }) => {
      const lastValue = event?.value?.slice(-1)?.[0]
      if (lastValue) {
        console.log('onSpeechResults: ', lastValue)
        onChange?.(lastValue) // Pass the recognized speech to the parent
      }
    }

    // Register voice handlers
    Voice.onSpeechResults = onSpeechResults
    Voice.onSpeechError = error => {
      console.error('Speech error:', error)
      setListen(false)
    }

    Voice.start('en-US') // Set language as needed
      .catch(err => console.error('Voice start error:', err))
  }, [])

  const onEnd = useCallback(() => {
    setListen(false)

    Voice.stop().catch(err => console.error('Voice stop error:', err))

    Voice.destroy().catch(err => console.error('Voice destroy error:', err))
  }, [])

  useEffect(() => {
    if (isFocused) {
      if (listen) {
        onStart()
      }
    } else {
      onEnd()
    }
  }, [isFocused])

  return (
    <Styled.Touchable
      {...props}
      width="auto"
      disabled={disabled}
      onPress={listen ? onEnd : onStart}>
      <Icon
        name="SpeechToText"
        fill={
          disabled
            ? COLORS.primary_300
            : listen
            ? COLORSprimary_300
            : COLORS.neutral_300
        }
      />
    </Styled.Touchable>
  )
}
