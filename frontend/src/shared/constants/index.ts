import type { ModeType } from '../types'

export const modeToStyle: Record<ModeType, 'success' | 'fail' | 'accent'> = {
  short: 'fail',
  long: 'success',
  accent: 'accent',
}
