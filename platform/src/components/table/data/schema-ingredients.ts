import { z } from "zod"

export const Schema = z.object({
  id: z.string(),
  name: z.string(),
  quantity: z.number(),
  cost: z.number(),
})

export type Schema = z.infer<typeof Schema>