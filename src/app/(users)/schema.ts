import { z } from 'zod'

export const upsertMenu = z.object({
  title: z.string()
})