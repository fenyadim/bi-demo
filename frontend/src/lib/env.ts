import { z } from 'zod'

declare global {
  const webappEnvFromBackend: Record<string, string> | undefined
}

export const zEnv = z.object({
  VITE_BACKEND_URL: z.string().trim().min(1),
})

export const env = zEnv.parse(process.env)
