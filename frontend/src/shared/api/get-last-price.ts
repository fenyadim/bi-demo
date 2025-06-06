export const getLastPriceApi = async (couple: string) => {
  const response = await fetch(
    `https://data-api.coindesk.com/futures/v1/latest/tick?market=binance&instruments=${couple}&apply_mapping=true`,
  )

  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}
