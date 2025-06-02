import Arrow from '@/assets/images/arrow-down.svg?react'
import { Button } from '@/shared/ui'

interface IFilterItem {
  title: string
}

export const FilterItem = ({ title }: IFilterItem) => {
  return (
    <Button
      className="px-2! py-1! h-fit text-xs font-light gap-0.5"
      variant="secondary"
    >
      {title}
      <Arrow className="fill-muted" />
    </Button>
  )
}
