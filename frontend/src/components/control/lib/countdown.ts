export const countdownCalc = (fundingTime: number) => {
  if (fundingTime === 0) return 'N/A'
  const now = Date.now()
  const timeDiff = Number(fundingTime) - now
  if (timeDiff <= 0) return '00:00:00'
  const hours = Math.floor(timeDiff / 1000 / 3600)
  const minutes = Math.floor(((timeDiff / 1000) % 3600) / 60)
  const seconds = Math.floor((timeDiff / 1000) % 60)
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}
