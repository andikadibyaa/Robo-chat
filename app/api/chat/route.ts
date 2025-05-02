import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: Request) {
  const { messages, knowledgeBase } = await req.json()

  // Create a system message that includes the knowledge base
  const systemMessage = knowledgeBase
    ? `You are a helpful assistant that answers questions based on the following information:
       
       ${knowledgeBase}
       
       If the question cannot be answered based on the provided information, say so politely.`
    : "You are a helpful assistant."

  const result = streamText({
    model: openai("gpt-4o"),
    messages,
    system: systemMessage,
  })

  return result.toDataStreamResponse()
}
