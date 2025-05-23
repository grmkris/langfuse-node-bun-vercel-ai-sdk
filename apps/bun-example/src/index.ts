import './tracing.ts'
import { Hono } from 'hono'
import { trace } from '@opentelemetry/api'

const app = new Hono()

// Get a tracer instance
const tracer = trace.getTracer('my-hono-bun-app', '1.0.0')

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

// Test endpoint to demonstrate OpenTelemetry tracing
app.get('/test', async (c) => {
  // Create a parent span for the entire request
  return await tracer.startActiveSpan('test-endpoint', async (span) => {
    try {
      span.setAttributes({
        'http.method': 'GET',
        'http.route': '/test',
        'custom.user': 'test-user'
      })

      console.log('Processing test request...')

      // Simulate some database work
      const dbResult = await simulateDbOperation()
      
      // Simulate some external API call
      const apiResult = await simulateApiCall()

      // Simulate some processing
      const processedData = await processData(dbResult, apiResult)

      span.setAttributes({
        'response.status': 'success',
        'response.items_count': processedData.length
      })

      return c.json({
        message: 'Tracing test completed successfully!',
        data: processedData,
        timestamp: new Date().toISOString()
      })
    } catch (error) {
      span.recordException(error as Error)
      span.setStatus({ code: 2, message: 'Error occurred' }) // ERROR status
      throw error
    } finally {
      span.end()
    }
  })
})

// Simulate database operation with tracing
async function simulateDbOperation(): Promise<string[]> {
  return await tracer.startActiveSpan('db-query', async (span) => {
    span.setAttributes({
      'db.operation': 'SELECT',
      'db.table': 'users',
      'db.duration_ms': 45
    })
    
    // Simulate some async work
    await new Promise(resolve => setTimeout(resolve, 50))
    
    const result = ['user1', 'user2', 'user3']
    span.setAttributes({
      'db.rows_affected': result.length
    })
    
    span.end()
    return result
  })
}

// Simulate external API call with tracing
async function simulateApiCall(): Promise<{ status: string, data: number }> {
  return await tracer.startActiveSpan('external-api-call', async (span) => {
    span.setAttributes({
      'http.url': 'https://api.example.com/data',
      'http.method': 'GET'
    })
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 100))
    
    const result = { status: 'ok', data: 42 }
    span.setAttributes({
      'http.status_code': 200,
      'response.size_bytes': JSON.stringify(result).length
    })
    
    span.end()
    return result
  })
}

// Simulate data processing with tracing
async function processData(dbData: string[], apiData: { status: string, data: number }): Promise<{ id: number, name: string, score: number, processed_at: string }[]> {
  return await tracer.startActiveSpan('data-processing', async (span) => {
    span.setAttributes({
      'processing.input_count': dbData.length,
      'processing.type': 'data-transformation'
    })
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 30))
    
    const processed = dbData.map((user, index) => ({
      id: index + 1,
      name: user,
      score: apiData.data + index,
      processed_at: new Date().toISOString()
    }))
    
    span.setAttributes({
      'processing.output_count': processed.length
    })
    
    span.end()
    return processed
  })
}

Bun.serve({
  fetch: app.fetch,
  port: 3001,
})

console.log("Server is running on http://localhost:3001")
console.log("Test tracing at: http://localhost:3001/test")

