import { TTestItem } from '@/entities/quiz'

export type TAnswersProps = {
  onPressItem?: () => void
} & Partial<Pick<TTestItem, 'answers' | '_id'>>
