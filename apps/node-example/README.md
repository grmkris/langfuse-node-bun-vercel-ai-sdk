# Node Example with AI Integration

This example demonstrates how to integrate Langfuse for AI tracing with the Vercel AI SDK using Google's Gemini model and OpenTelemetry.

## Features

- **AI Text Generation**: Generate text using Google's Gemini model
- **AI Chat Completion**: Multi-turn conversations with AI
- **Sentiment Analysis**: Analyze sentiment of text with AI
- **Langfuse Tracing**: Comprehensive tracing and observability for all AI operations
- **OpenTelemetry Integration**: Distributed tracing with custom spans
- **Hono Web Framework**: Fast, lightweight web server

## Environment Variables

Create a `.env` file in the `apps/node-example` directory with the following variables:

```env
# Langfuse Configuration
LANGFUSE_PUBLIC_API_KEY=pk-lf-your-public-key-here
LANGFUSE_SECRET_API_KEY=sk-lf-your-secret-key-here
LANGFUSE_HOST=https://cloud.langfuse.com

# Google AI Configuration
GOOGLE_GENERATIVE_AI_API_KEY=your-google-ai-api-key-here
```

## Getting Started

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Set up your environment variables (see above)

3. Run the development server:
   ```bash
   pnpm dev
   ```

4. The server will start on `http://localhost:3000`

## API Endpoints

### `/ai-test` (GET)

Test AI text generation and sentiment analysis using query parameters.

**Query Parameters:**
- `prompt` (required): The text prompt for the AI
- `operation` (optional): Either "generate" or "sentiment" (default: "generate")
- `userId` (optional): User identifier for tracking
- `sessionId` (optional): Session identifier for tracking
- `model` (optional): Model name (default: "gemini-1.5-flash")
- `temperature` (optional): Temperature for generation (0.0-1.0)
- `maxTokens` (optional): Maximum tokens to generate

**Response:**
```json
{
  "success": true,
  "operation": "generate",
  "result": "Generated text...",
  "usage": {
    "promptTokens": 10,
    "completionTokens": 50,
    "totalTokens": 60
  },
  "traceId": "trace-id-here",
  "metadata": {
    "model": "gemini-1.5-flash",
    "timestamp": "2024-01-01T00:00:00.000Z"
  }
}
```

### `/ai-chat` (POST)

Multi-turn conversation with AI.

**Request Body:**
```json
{
  "messages": [
    {"role": "system", "content": "You are a helpful assistant"},
    {"role": "user", "content": "Hello, how are you?"}
  ],
  "userId": "user123", // optional
  "sessionId": "session456", // optional
  "model": "gemini-1.5-flash", // optional
  "temperature": 0.7, // optional
  "maxTokens": 500 // optional
}
```

**Response:**
```json
{
  "success": true,
  "response": "AI response here...",
  "usage": {
    "promptTokens": 20,
    "completionTokens": 30,
    "totalTokens": 50
  },
  "traceId": "trace-id-here",
  "metadata": {
    "model": "gemini-1.5-flash",
    "conversationLength": 2,
    "timestamp": "2024-01-01T00:00:00.000Z"
  }
}
```

### `/test` (GET)

Test OpenTelemetry tracing with simulated operations.

## Example Usage

### Generate Text
```bash
curl "http://localhost:3000/ai-test?prompt=Explain%20quantum%20computing%20in%20simple%20terms&operation=generate&userId=user123&temperature=0.8&maxTokens=200"
```

### Sentiment Analysis
```bash
curl "http://localhost:3000/ai-test?prompt=I%20love%20this%20new%20feature!%20It%20works%20amazingly%20well.&operation=sentiment&userId=user123"
```

### Simple Text Generation
```bash
curl "http://localhost:3000/ai-test?prompt=Write%20a%20haiku%20about%20programming"
```

### Chat Completion
```bash
curl -X POST http://localhost:3000/ai-chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "system", "content": "You are a coding assistant"},
      {"role": "user", "content": "How do I implement a binary search?"}
    ],
    "userId": "developer123",
    "sessionId": "coding-session-1"
  }'
```

## Tracing and Observability

All AI operations are automatically traced using:

- **Langfuse**: AI-specific tracing with token usage, model performance, and user attribution
- **OpenTelemetry**: Distributed tracing with custom spans and attributes
- **Vercel AI SDK**: Built-in experimental telemetry support

Traces include:
- Input prompts and outputs
- Token usage statistics
- Model parameters (temperature, max tokens, etc.)
- User and session attribution
- Custom tags and metadata
- Performance metrics

## Architecture

The application uses a layered architecture:

1. **`tracing.ts`**: Global OpenTelemetry and Langfuse setup
2. **`ai-example.ts`**: AI functionality with tracing integration
3. **`index.ts`**: HTTP endpoints using Hono framework
4. **`env.ts`**: Environment variable validation

This approach ensures:
- Single point of tracing configuration
- Clean separation of concerns
- Type-safe environment handling
- Comprehensive observability

```
open http://localhost:3000
```