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
      {...props}
    />
  )
}

export { Toaster }
