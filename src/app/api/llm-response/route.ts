import { createGroq } from "@ai-sdk/groq";
import { generateText } from "ai";

export async function POST(req: Request) {
  const reqBody = await req.json();
  const prompt = reqBody.data.prompt;

  const groq = createGroq({
    baseURL: "https://api.groq.com/openai/v1",
    apiKey: process.env.LLAMA_KEY,
  });

  const { text } = await generateText({
    model: groq("gemma2-9b-it"),
    prompt,
  });

  return new Response(JSON.stringify({ message: text }));
}
