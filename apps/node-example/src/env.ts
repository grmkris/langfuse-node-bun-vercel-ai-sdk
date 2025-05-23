import { z } from "zod"
import { env as processEnv } from 'node:process';

const envSchema = z.object({
  LANGFUSE_PUBLIC_API_KEY: z.string(),
  LANGFUSE_SECRET_API_KEY: z.string(),
  LANGFUSE_HOST: z.string().url(),
})

export const env = envSchema.parse(processEnv)