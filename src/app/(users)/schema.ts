import { z } from 'zod'

export const upsertMenu = z.object({
  title: z.string().min(1, "Por favor informe o nome do menu")
})