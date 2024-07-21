import { z } from "zod"

export const Schema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  quantity: z.number(),
})

export type Schema = z.infer<typeof Schema>
