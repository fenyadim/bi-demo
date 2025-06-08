import { ReactComponent as Level } from '@/assets/images/level.svg'
import { cn } from '@/lib/utils'

interface ILevels {
  closeCount: number
}

export const Levels = ({ closeCount }: ILevels) => {
  return (
    <div className="flex">
      {Array(4)
        .fill(0)
        .map((_, index) => (
          <Level
            key={index}
            className={cn('fill-muted h-3.5 w-[3px]', {
              'fill-success': index < closeCount,
            })}
          />
        ))}
    </div>
  )
}
