import React, { useCallback, useEffect } from 'react'

import Tts from 'react-native-tts' // Import the TTS library

import { Icon } from '@/shared'

import * as S from './styles'
import { TTextToSpeechProps } from './types'

export const TextToSpeech = ({ text, ...props }: TTextToSpeechProps) => {
  const onPress = useCallback(() => {
    if (text) {
      Tts.speak(text, {
        iosVoiceId: 'com.apple.ttsbundle.Moira-compact',
        rate: 0.5,
        androidParams: {
          KEY_PARAM_PAN: 0,
          KEY_PARAM_VOLUME: 1,
          KEY_PARAM_STREAM: 'STREAM_MUSIC',
        },
      })
    }
  }, [text])

  useEffect(() => {
    Tts.addEventListener('tts-start', event => console.log('start', event))
    Tts.addEventListener('tts-progress', event =>
      console.log('progress', event),
    )
    Tts.addEventListener('tts-finish', event => console.log('finish', event))
    Tts.addEventListener('tts-cancel', event => console.log('cancel', event))
  }, [])

  return (
    <S.Conatiner {...props} onPress={onPress}>
      <Icon name="Sound" />
    </S.Conatiner>
  )
}
