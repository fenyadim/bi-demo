import { Checkbox as CheckboxUI } from '@/shared/ui'

interface ICheckbox {
  title: string
}

export const Checkbox = ({ title }: ICheckbox) => {
  return (
    <div className="flex items-center gap-2">
      <CheckboxUI className="size-3 rounded-full bg-background!" id="tpsl" />
      <label htmlFor="tpsl" className="border-b-1 border-muted border-dotted">
        {title}
      </label>
    </div>
  )
}
