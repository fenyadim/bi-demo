import { createContext, useContext, useState } from 'react'

type SheetProviderProps = {
  children: React.ReactNode
}

type SheetProviderState = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const initialState: SheetProviderState = {
  isOpen: false,
  setIsOpen: () => null,
}

const SheetProviderContext = createContext<SheetProviderState>(initialState)

export function SheetProvider({ children, ...props }: SheetProviderProps) {
  const [isOpen, setIsOpen] = useState(false)

  const value = {
    isOpen,
    setIsOpen: (isOpen: boolean) => {
      setIsOpen(isOpen)
    },
  }

  return (
    <SheetProviderContext.Provider {...props} value={value}>
      {children}
    </SheetProviderContext.Provider>
  )
}

export const useSheetToggle = () => {
  const context = useContext(SheetProviderContext)

  return context
}
