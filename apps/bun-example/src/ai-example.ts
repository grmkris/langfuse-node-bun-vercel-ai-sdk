import { generateText } from 'ai'
import { google } from '@ai-sdk/google'

export interface AIResponse {
  text: string
  usage?: {
    promptTokens: number
    completionTokens: number
    totalTokens: number
  }
  metadata: Record<string, string | number | boolean>
}

/**
 * Generate AI text with Langfuse tracing integration
 */
export async function generateAIText(
  prompt: string, 
  options: {
    model?: string
    maxTokens?: number
    temperature?: number
    userId?: string
    sessionId?: string
    tags?: string[]
    metadata?: Record<string, string | number | boolean>
  } = {}
): Promise<AIResponse> {
  const {
    model = 'gemini-1.5-flash',
    maxTokens = 500,
    temperature = 0.7,
    userId,
    sessionId,
    tags,
    metadata = {}
  } = options

  // Generate text using Vercel AI SDK with experimental telemetry
  const result = await generateText({
    model: google(model),
    prompt,
    maxTokens,
    temperature,
    experimental_telemetry: {
      isEnabled: true,
      functionId: 'ai-text-generation-bun',
      metadata: {
        ...metadata,
        ...(userId && { langfuseUserId: userId }),
        ...(sessionId && { langfuseSessionId: sessionId }),
        ...(tags && { langfuseTags: tags }),
      },
    },
  })
  const response: AIResponse = {
    text: result.text,
    usage: {
      promptTokens: result.usage.promptTokens,
      completionTokens: result.usage.completionTokens,
      totalTokens: result.usage.totalTokens,
    },
    metadata: {
      model,
      finishReason: result.finishReason,
      timestamp: new Date().toISOString(),
      ...(userId && { userId }),
      ...(sessionId && { sessionId }),
      ...(tags && { tags: tags.join(',') }),
      ...metadata
    }
  }

  return response
} 