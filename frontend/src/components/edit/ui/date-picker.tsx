import { Edit } from 'lucide-react'

import { useDateTime } from '@/shared/hooks'
import {
  Button,
  Calendar,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/ui'

interface IDatePicker {
  initialDate: string
  onChange: (newDate: string) => void
}

export const DatePicker = ({ initialDate, onChange }: IDatePicker) => {
  const { selectedDate, selectedTime, handleDateTimeChange } = useDateTime({
    initialDate,
    onChange,
  })

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary" size="icon">
          <Edit />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Calendar
          mode="single"
          selected={selectedDate}
          captionLayout="dropdown"
          onSelect={(date) => {
            if (date) {
              handleDateTimeChange(date, selectedTime)
            }
          }}
        />
        <div className="flex flex-col gap-1">
          <label className="text-sm">Время: </label>
          <Input
            type="time"
            id="createdAtTime"
            step="1"
            value={selectedTime}
            className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
            onChange={(e) => {
              handleDateTimeChange(selectedDate, e.target.value)
            }}
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}
