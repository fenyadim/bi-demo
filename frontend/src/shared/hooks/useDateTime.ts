import { useState } from 'react'

import { formatDateAndTime } from '@/shared/utils/formatDate'

type UseDateTimeProps = {
  initialDate: string
  onChange: (newDate: string) => void
}

export const useDateTime = ({ initialDate, onChange }: UseDateTimeProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(initialDate))
  const [selectedTime, setSelectedTime] = useState(
    formatDateAndTime(initialDate).time,
  )

  const handleDateTimeChange = (newDate: Date | undefined, newTime: string) => {
    if (!newDate) return

    const [hours, minutes, seconds] = newTime.split(':').map(Number)
    newDate.setHours(hours)
    newDate.setMinutes(minutes)
    newDate.setSeconds(seconds)

    setSelectedDate(newDate)
    setSelectedTime(newTime)
    onChange(newDate.toISOString())
  }

  return {
    selectedDate,
    selectedTime,
    handleDateTimeChange,
  }
}
