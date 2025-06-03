import { Minus, Plus } from 'lucide-react'

import { useStorage } from '@/shared/hooks'
import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  type MarksType,
  Slider,
} from '@/shared/ui'

export const LeverageDrawer = () => {
  const { value, set } = useStorage('leverage', [10])

  const marks: MarksType[] = [
    { value: 0, label: '1X' },
    { value: 15, label: '15X' },
    { value: 30, label: '30X' },
    { value: 45, label: '45X' },
    { value: 60, label: '60X' },
    { value: 75, label: '75X' },
  ]

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">{value}х</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Изменить плечо</DrawerTitle>
        </DrawerHeader>
        <div className="flex flex-col gap-7 px-4 pb-3.5">
          <div className="flex rounded-sm overflow-hidden justify-between items-stretch">
            <Button
              className="px-2! text-muted rounded-none"
              variant="secondary"
            >
              <Minus className="size-3" />
            </Button>
            <p className="flex justify-center items-center bg-secondary w-full text-base">
              {value}x
            </p>
            <Button
              className="px-2! text-muted rounded-none"
              variant="secondary"
            >
              <Plus className="size-3" />
            </Button>
          </div>
          <Slider value={value} onValueChange={set} max={75} marks={marks} />
        </div>
        <DrawerFooter className="pb-12">
          <DrawerClose asChild>
            <Button className="bg-accent w-full py-5! text-base">
              Подтвердить
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
