import { PropsWithChildren } from 'react'

import Popover from 'react-native-popover-view'

export type TPopoverProps = PropsWithChildren<Partial<Popover['props']>>

export type TPopoverRef = Popover | null
