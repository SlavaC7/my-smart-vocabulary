import { TTestItem } from '../../../entities/quiz/models'

export type TQuestionCardProps = {
  onPressItem?: () => void
} & TTestItem
