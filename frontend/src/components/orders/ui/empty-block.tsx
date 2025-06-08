import { ReactComponent as EmptyOrder } from '@/assets/images/empty-order.svg'
import { Button } from '@/shared/ui'

export const EmptyBlock = () => {
  return (
    <div className="flex flex-col gap-1.5 items-center mt-1.5">
      <EmptyOrder className="size-12" />
      <h3 className="text-sm font-medium">У вас нет позиции</h3>
      <p className="mt-1.5 mb-1 text-muted text-[11px] tracking-wider">
        Разрешите лучшим трейдерам торговать для вас
      </p>
      <Button
        className="font-normal tracking-wider text-[11px] p-3 rounded-sm h-0"
        variant="outline"
      >
        Копи-трейдинг
      </Button>
    </div>
  )
}
