export const formatDate = (date: string): string => {
  return new Date(date)
    .toLocaleString('ru-RU', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })
    .replace(',', '')
}

type Orientation = 'normal' | 'reverse'

export const formatDateAndTime = (
  dateString: string,
  orientation: Orientation = 'normal',
) => {
  const orientationToLocale: Record<Orientation, string> = {
    normal: 'ru-RU',
    reverse: 'en-CA',
  }

  const date = new Date(dateString)
  const formattedDate = date.toLocaleDateString(
    orientationToLocale[orientation],
    {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    },
  )
  const formattedTime = date.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
  return { date: formattedDate, time: formattedTime }
}
