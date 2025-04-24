import { TTestItem } from '@/entities/test'

export type TAnswersProps = {
  onPressItem?: () => void
} & Partial<Pick<TTestItem, 'answers' | '_id'>>
