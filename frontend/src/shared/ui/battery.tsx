interface IBattery {
  className?: string
  procent?: number
}

export const Battery = ({ className, procent = 1 }: IBattery) => {
  const value = procent > 1 ? 1 : procent
  const color = procent <= 0.2 ? '#FF0000' : '#fff'

  return (
    <svg
      className={className}
      viewBox="0 0 28 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        opacity="0.35"
        x="0.5"
        y="0.5"
        width="24"
        height="12"
        rx="3.8"
        stroke="#797D82"
      />
      <path
        opacity="0.4"
        d="M26 4.78113V8.8566C26.8047 8.51143 27.328 7.70847 27.328 6.81886C27.328 5.92926 26.8047 5.1263 26 4.78113"
        fill="#797D82"
      />
      <rect x="2" y="2" width={21 * value} height="9" rx="2.5" fill={color} />
    </svg>
  )
}
