import React, { useEffect, useRef, useState } from 'react'

import Voice, { SpeechResultsEvent } from '@react-native-community/voice'

import { useIsFocused } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

import { TextInput } from 'react-native-gesture-handler'

import SoundPlayer from 'react-native-sound-player'

import { EColors, Icon, isIOS } from '@/shared'
import { Body2R } from '@/shared/ui/styled/Text'

import { source } from './config'
import {
  Buttons,
  ButtonWrapper,
  Container,
  ControllButton,
  LottieTouchable,
  StyledLottie,
  StyledTextArea,
} from './styles'
import { TTextRecordProps } from './types'

export const TextRecord = ({ value, setValue }: TTextRecordProps) => {
  const { t } = useTranslation()
  const [height, setHeight] = useState(0)
  const [isRecording, setIsRecording] = useState(false)
  const [voiceHandled, setVoiceHandled] = useState(false)

  const isFocused = useIsFocused()
  const localValueRef = useRef('')
  const inputRef = useRef<TextInput>(null)
  const speechStartHandler = async () => {
    console.log('speechStart successful')
  }

  const handleValues = () => {
    setVoiceHandled(true)
    if (localValueRef.current.length) {
      setValue(prev =>
        !!localValueRef.current.length
          ? prev + ' ' + localValueRef.current
          : prev,
      )
    }

    localValueRef.current = ''
  }

  const stopRecording = async () => {
    try {
      if (isRecording) {
        setIsRecording(false)
        setTimeout(async () => {
          await Voice.stop()
          handleValues()
        }, 500)
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  const speechEndHandler = async () => {}

  const speechResultsHandler = async (e: SpeechResultsEvent) => {
    const text = e?.value?.[0]
    console.log(text, localValueRef.current, 'localValue')

    if (text) {
      if (isIOS) {
        if (!voiceHandled) {
          localValueRef.current = text as string
        }
        return
      }

      localValueRef.current = text as string
    }
  }

  const startRecording = async () => {
    SoundPlayer.stop()
    setTimeout(async () => {
      setVoiceHandled(false)
      setIsRecording(true)

      try {
        await Voice.start('uk-UK')
      } catch (error) {
        console.log('error', error)
      }
    }, 100)
  }

  const clear = () => {
    setValue('')
    localValueRef.current = ''
  }

  const onError = () => {
    console.log('error')
  }

  useEffect(() => {
    Voice.onSpeechStart = speechStartHandler
    Voice.onSpeechEnd = speechEndHandler
    Voice.onSpeechResults = speechResultsHandler
    Voice.onSpeechError = onError

    return () => {
      console.log('closed')
      Voice.destroy().then(Voice.removeAllListeners)
      setVoiceHandled(false)
    }
  }, [isFocused])

  return (
    <Container onLayout={e => setHeight(e.nativeEvent.layout.height)}>
      {isRecording && (
        <LottieTouchable containerHeight={height} onPress={stopRecording}>
          <StyledLottie
            containerHeight={height}
            source={source}
            loop
            autoPlay
          />
        </LottieTouchable>
      )}
      <StyledTextArea
        value={value}
        placeholderTextColor={EColors.text_3}
        multiline
        ref={inputRef}
        onChangeText={setValue}
        placeholder={t('text_record.placeholder_short')}
      />
      <Buttons>
        {/* <ButtonWrapper invisible={true}>
          <SideButton onPress={stopRecording}>
            <Icon name="Stop" size={17} />
          </SideButton>
          <Body2R mTop="16px" color={EColors.black}>
            {t('text_record.stop')}
          </Body2R>
        </ButtonWrapper> */}
        <ButtonWrapper>
          <ControllButton
            isRecording={isRecording}
            onPress={isRecording ? stopRecording : startRecording}>
            <Icon name={isRecording ? 'Pause' : 'Play'} size={28} />
          </ControllButton>
          <Body2R mTop="16px" color={EColors.black}>
            {t('text_record.record')}
          </Body2R>
        </ButtonWrapper>
        <ButtonWrapper>
          <ControllButton isRecording={false} onPress={clear}>
            <Icon name="Delete" size={24} />
          </ControllButton>
          <Body2R mTop="16px" color={EColors.black}>
            {t('text_record.delete')}
          </Body2R>
        </ButtonWrapper>
      </Buttons>
    </Container>
  )
}
