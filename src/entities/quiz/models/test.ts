import { EWordType } from '@/entities/word'

export enum EQuizItemMode {
  multiple_choice = 'multiple_choice',
  write_word = 'write_word',
  match = 'match',
}

export enum EQuizStatus {
  in_progress = 'in_progress',
  completed = 'completed',
  canceled = 'canceled',
}

export type TTestItem = {
  _id: string
  wordId: string
  word: string
  answers: TAnswer[]
  flag: string
  type: EWordType
}

export type TAnswer = {
  _id: string
  text: string
  isCorrect: boolean
}

export type TQuiz = {
  _id: string
  ownerUid: string
  quiz: [
    {
      id: '9dd70da8-ac99-442d-84d6-cfe6226f85eb'
      wordId: '68a349da253a3fb6ac2bae2b'
      word: 'Mercoledi'
      answers: [
        {
          id: 'e8a6d4e8-a443-4804-93f9-89c3a32e83b4'
          text: 'Середа'
          isCorrect: true
        },
        {
          id: 'c0c5b48f-120c-4619-bfd4-a63143ca5e19'
          text: 'Понеділок'
          isCorrect: false
        },
        {
          id: '0642bce3-f2a8-4825-b677-e1b9a47e12a5'
          text: 'Вівторок'
          isCorrect: false
        },
      ]
      flag: '🇮🇹'
      type: 'word'
      mode: 'match'
    },
    {
      id: 'c947e20e-1147-4118-b1e0-2b237fa1c857'
      wordId: '68a3495f253a3fb6ac2bae27'
      word: 'Martedi'
      answers: [
        {
          id: 'bebfd7e0-9c12-4dbc-acaa-6991f6637628'
          text: 'Середа'
          isCorrect: false
        },
        {
          id: 'af1b9526-2222-4b3b-b7ab-f9803a7f476a'
          text: 'Вівторок'
          isCorrect: true
        },
        {
          id: '140ce716-bbea-40a2-9355-291528d2b0dd'
          text: 'Понеділок'
          isCorrect: false
        },
      ]
      flag: '🇮🇹'
      type: 'word'
      mode: 'match'
    },
    {
      id: '6c774185-9a39-4213-9002-946313f60b0a'
      wordId: '68a34934253a3fb6ac2bae25'
      word: 'Lunedi'
      answers: [
        {
          id: '089d5969-1d14-4a19-9b19-a9d8160e87af'
          text: 'Середа'
          isCorrect: false
        },
        {
          id: '6c49c085-612c-4ec5-88b7-4e32506ffd25'
          text: 'Вівторок'
          isCorrect: false
        },
        {
          id: '7903f30a-456b-461d-adee-5887e46497e5'
          text: 'Понеділок'
          isCorrect: true
        },
      ]
      flag: '🇮🇹'
      type: 'word'
      mode: 'match'
    },
  ]
  userAnswers: []
  correct: number
  incorrect: number
  status: EQuizStatus
  config: {
    count: number
    folders: string[]
    type: EWordType[]
    lang: string[]
    weakWords: boolean
    mode: EQuizItemMode
  }
  createdAt: string
  updatedAt: string
}
