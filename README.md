# Langfuse Test: Node.js & Bun Examples

This repository demonstrates how to integrate [Langfuse](https://langfuse.com) observability with both Node.js and Bun applications using OpenTelemetry. It showcases tracing, AI integration, and modern TypeScript development practices.

## 📊 Key Features

### 1. OpenTelemetry Tracing
Both examples use OpenTelemetry for comprehensive tracing:
- [`apps/bun-example/src/tracing.ts`](apps/bun-example/src/tracing.ts) - Bun tracing setup
- [`apps/node-example/src/tracing.ts`](apps/node-example/src/tracing.ts) - Node.js tracing setup

### 2. AI Integration
Demonstrates AI SDK usage with proper observability:
- [`apps/bun-example/src/ai-example.ts`](apps/bun-example/src/ai-example.ts) - Bun AI example
- [`apps/node-example/src/ai-example.ts`](apps/node-example/src/ai-example.ts) - Node.js AI example

Features:
- Text generation with Google's Generative AI
- Automatic tracing of AI calls with Langfuse
- Support for custom tags and metadata
- Token usage tracking

### 4. API Endpoints

Both applications expose the following endpoints:

- `GET /` - Welcome message
- `GET /test` - Custom tracing demonstration with simulated DB and API operations
- `GET /ai-test?prompt=<text>` - AI text generation with Langfuse tracing


## 🛠️ Setup

### Prerequisites
- Node.js 18+ or Bun 1.0+
- [PNPM](https://pnpm.io/) package manager
- Langfuse account (for API keys)
- Google AI API key (for AI examples)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/langfuse-test-node-bun.git
cd langfuse-test-node-bun
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables in each app directory:
```bash
# For both apps/bun-example and apps/node-example
cp .env.example .env
```

4. Configure your `.env` file with:
```env
LANGFUSE_PUBLIC_KEY=your_langfuse_public_key
LANGFUSE_SECRET_KEY=your_langfuse_secret_key
LANGFUSE_BASEURL=https://cloud.langfuse.com
GOOGLE_GENERATIVE_AI_API_KEY=your_google_ai_key
```

## 🚀 Running the Applications

### Bun Example
```bash
pnpm bun:dev
```
This starts the Bun server with hot reload on `http://localhost:3001`

### Node.js Example
```bash
pnpm node:dev
```
This starts the Node.js server with watch mode

## 🔍 Observability with Langfuse

Once running, all traces are automatically sent to Langfuse where you can:
- View request traces with timing information
- Analyze AI model usage and performance
- Debug issues with detailed span data
- Monitor application health

Access your traces at: https://cloud.langfuse.com

## 🧪 Testing the APIs

### Test Tracing Endpoint
```bash
curl http://localhost:3001/test
```
This endpoint demonstrates custom OpenTelemetry spans with simulated database operations, external API calls, and data processing.

### AI Text Generation
```bash
curl "http://localhost:3001/ai-test?prompt=Write%20a%20haiku%20about%20observability"
```
This endpoint uses the Google Generative AI model with full Langfuse tracing integration.

## 📚 Dependencies

### Core Dependencies
- **[@opentelemetry/*](https://opentelemetry.io/)** - Distributed tracing
- **[@langfuse/langfuse](https://langfuse.com)** - Observability platform
- **[@ai-sdk/google](https://sdk.vercel.ai/)** - AI SDK for Google's models
- **[hono](https://hono.dev)** - Web framework
- **[zod](https://zod.dev)** - Schema validation

### Development
- **[tsx](https://github.com/esbuild-kit/tsx)** - TypeScript execution for Node.js
- **[bun](https://bun.sh)** - All-in-one JavaScript runtime


## 🔗 Resources

- [Langfuse Documentation](https://langfuse.com/docs)
- [OpenTelemetry JS Documentation](https://opentelemetry.io/docs/instrumentation/js/)
- [Hono Documentation](https://hono.dev/getting-started/basic)
- [AI SDK Documentation](https://sdk.vercel.ai/docs)
- [Bun Documentation](https://bun.sh/docs)