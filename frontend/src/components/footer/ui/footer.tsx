import { ReactComponent as Arrow } from '@/assets/images/arrow-down.svg'
import { cn } from '@/lib/utils'
import { useStorage } from '@/shared/hooks'

import { navItems } from '../constants'
import { NavButton } from './nav-button'

export const Footer = ({ className }: { className?: string }) => {
  const { value: coupleValue } = useStorage<string>('couple')

  return (
    <>
      <footer
        className={cn(
          'fixed bottom-0 left-0 right-0 bg-background pb-[22px]',
          className,
        )}
      >
        <div className="flex justify-between items-center border-y-1 py-1.5 px-3.5">
          <p>График {coupleValue} Бессрочный</p>
          <Arrow className="size-4 fill-muted rotate-180" />
        </div>
        <div className="grid grid-cols-5 mb-1">
          {navItems.map((items) => (
            <NavButton key={items.title} {...items} />
          ))}
        </div>
      </footer>
    </>
  )
}
