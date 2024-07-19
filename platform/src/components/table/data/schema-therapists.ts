import { z } from "zod"

export const Schema = z.object({
  id: z.string(),
  firstname: z.string(),
  lastname: z.string(),
  birthdate: z.string(),
  phone: z.string(),
  email: z.string(),
})

export type Schema = z.infer<typeof Schema>
