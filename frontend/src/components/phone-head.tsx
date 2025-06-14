import { ReactComponent as Cellular } from '@/assets/images/phone/cellular.svg'
import { ReactComponent as Wifi } from '@/assets/images/phone/wifi.svg'
import { useCurrentTime } from '@/shared/hooks'
import { Battery } from '@/shared/ui/battery'

export const PhoneHead = () => {
  const time = useCurrentTime()

  return (
    <div className="flex justify-between items-center px-8 pt-5">
      <p className="font-[SF-Pro] text-lg pl-2">{time}</p>
      <div className="w-44 h-[35px] bg-black rounded-full flex items-center pl-3">
        <span className="block size-3 bg-[#FF0000] animate-rec rounded-full" />
      </div>
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
