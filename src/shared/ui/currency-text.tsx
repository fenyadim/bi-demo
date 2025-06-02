import CurrencyFormat from 'react-currency-format'

interface ICurrencyText {
  value?: string | number | null
  decimalScale?: number
  fixedDecimalScale?: boolean
  prefix?: string
  suffix?: string
}

export const CurrencyText = ({
  value,
  decimalScale = 1,
  fixedDecimalScale = true,
  prefix,
  suffix,
}: ICurrencyText) => {
  return (
    <CurrencyFormat
      value={value}
      displayType="text"
      thousandSeparator=" "
      decimalSeparator=","
      decimalScale={decimalScale}
      fixedDecimalScale={fixedDecimalScale}
      prefix={prefix}
      suffix={suffix}
    />
  )
}
