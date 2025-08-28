import { EQuizItemMode } from '@/entities/quiz'

export type TTypePickerProps = {
  value: EQuizItemMode[]
  onChange: (value: EQuizItemMode[]) => void
}
