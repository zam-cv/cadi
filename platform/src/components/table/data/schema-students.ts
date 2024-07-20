import { z } from "zod"

export const Schema = z.object({
  id: z.string(),
  firstname: z.string(),
  lastname: z.string(),
  birthdate: z.string(),
  email: z.string(),
  relative: z.string(),
  phone: z.string(), // relative
})

export type Schema = z.infer<typeof Schema>
