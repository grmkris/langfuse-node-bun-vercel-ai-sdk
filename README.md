# Langfuse Test: Node.js & Bun Examples

This repository demonstrates how to integrate [Langfuse](https://langfuse.com) observability with both Node.js and Bun applications using OpenTelemetry. It showcases tracing, AI integration, and modern TypeScript development practices.

## 🚀 Overview

This monorepo contains two example applications that demonstrate:
- **OpenTelemetry Tracing**: Automatic instrumentation with custom spans
- **Langfuse Integration**: Exporting telemetry data to Langfuse for observability
- **AI SDK Integration**: Using Google's Generative AI with proper tracing
- **Modern Web Framework**: Built with [Hono](https://hono.dev) for fast, lightweight APIs
- **Type Safety**: Full TypeScript support with Zod validation

## 📁 Project Structure

```
langfuse-test-node-bun/
├── apps/
│   ├── bun-example/          # Bun runtime example
│   │   ├── src/
│   │   │   ├── index.ts      # Main server entry point
│   │   │   ├── tracing.ts    # OpenTelemetry & Langfuse setup
│   │   │   ├── ai-example.ts # AI integration example
│   │   │   └── env.ts        # Environment validation
│   │   └── package.json
│   └── node-example/         # Node.js runtime example
│       ├── src/
│       │   ├── index.ts      # Main server entry point
│       │   ├── tracing.ts    # OpenTelemetry & Langfuse setup
│       │   ├── ai-example.ts # AI integration example
│       │   └── env.ts        # Environment validation
│       └── package.json
├── package.json              # Root workspace configuration
├── pnpm-workspace.yaml       # PNPM workspace setup
└── README.md                 # This file
```

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
This starts the Bun server with hot reload on `http://localhost:3000`

### Node.js Example
```bash
pnpm node:dev
```
This starts the Node.js server with watch mode on `http://localhost:3001`

## 📊 Key Features

### 1. OpenTelemetry Tracing
Both examples use OpenTelemetry for comprehensive tracing:
- [`apps/bun-example/src/tracing.ts`](apps/bun-example/src/tracing.ts) - Bun tracing setup
- [`apps/node-example/src/tracing.ts`](apps/node-example/src/tracing.ts) - Node.js tracing setup

Features:
- Automatic HTTP instrumentation
- Custom span creation
- Context propagation
- Langfuse exporter integration

### 2. AI Integration
Demonstrates AI SDK usage with proper observability:
- [`apps/bun-example/src/ai-example.ts`](apps/bun-example/src/ai-example.ts) - Bun AI example
- [`apps/node-example/src/ai-example.ts`](apps/node-example/src/ai-example.ts) - Node.js AI example

Features:
- Text generation with Google's Generative AI
- Sentiment analysis
- Automatic tracing of AI calls
- Response streaming support

### 3. Environment Validation
Type-safe environment variable handling with Zod:
- [`apps/bun-example/src/env.ts`](apps/bun-example/src/env.ts) - Bun env validation
- [`apps/node-example/src/env.ts`](apps/node-example/src/env.ts) - Node.js env validation

### 4. API Endpoints

Both applications expose the following endpoints:

- `GET /` - Welcome message
- `GET /hello/:name` - Personalized greeting
- `POST /generate` - AI text generation
- `POST /analyze-sentiment` - Sentiment analysis
- `GET /trace-example` - Custom tracing demonstration

## 🔍 Observability with Langfuse

Once running, all traces are automatically sent to Langfuse where you can:
- View request traces with timing information
- Analyze AI model usage and performance
- Debug issues with detailed span data
- Monitor application health

Access your traces at: https://cloud.langfuse.com

## 🧪 Testing the APIs

### Generate Text
```bash
curl -X POST http://localhost:3000/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Write a haiku about observability"}'
```

### Analyze Sentiment
```bash
curl -X POST http://localhost:3000/analyze-sentiment \
  -H "Content-Type: application/json" \
  -d '{"text": "I love using Langfuse for monitoring my AI applications!"}'
```

### Custom Trace Example
```bash
curl http://localhost:3000/trace-example
```

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

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License.

## 🔗 Resources

- [Langfuse Documentation](https://langfuse.com/docs)
- [OpenTelemetry JS Documentation](https://opentelemetry.io/docs/instrumentation/js/)
- [Hono Documentation](https://hono.dev/getting-started/basic)
- [AI SDK Documentation](https://sdk.vercel.ai/docs)
- [Bun Documentation](https://bun.sh/docs)