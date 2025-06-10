import { Toaster as Sonner, type ToasterProps } from 'sonner'

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      toastOptions={{
        style: {
          backgroundColor: 'var(--secondary)',
          color: 'var(--foreground)',
          border: 'none',
        },
      }}
      className="toaster group"
      duration={1000000000}
      {...props}
    />
  )
}

export { Toaster }
