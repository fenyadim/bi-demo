import Cellular from '@/assets/images/phone/cellular.svg?react'
import Wifi from '@/assets/images/phone/wifi.svg?react'
import { Battery } from '@/shared/ui/battery'

export const PhoneHead = () => {
  return (
    <div className="flex justify-between px-10 pt-5">
      <p className="font-[SF-Pro] text-lg pl-2">14:46</p>
      <div className="flex items-center gap-[9px] *:size-fit">
        <span>
          <Cellular className="w-5.5" />
        </span>
        <span>
          <Wifi className="w-5" />
        </span>
        <span>
          <Battery className="w-[30px]" procent={Math.random()} />
        </span>
      </div>
    </div>
  )
}
