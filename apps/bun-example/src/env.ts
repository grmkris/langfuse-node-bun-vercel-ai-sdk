import { z } from "zod"

const envSchema = z.object({
  LANGFUSE_PUBLIC_API_KEY: z.string(),
  LANGFUSE_SECRET_API_KEY: z.string(),
  LANGFUSE_HOST: z.string().url(),
  GOOGLE_GENERATIVE_AI_API_KEY: z.string(),
})

export const env = envSchema.parse(Bun.env)