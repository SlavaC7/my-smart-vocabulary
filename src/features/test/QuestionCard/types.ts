import { TTestItem } from '../../../entities/test/models'

export type TQuestionCardProps = {
  onPressItem?: () => void
} & TTestItem
