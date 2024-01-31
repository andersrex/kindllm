import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources";

const MODEL = "mistralai/Mixtral-8x7B-Instruct-v0.1"; // "gpt-3.5-turbo";
// We're using Anyscale Endpoints for inference, change this to use OpenAI
const BASE_URL = "https://api.endpoints.anyscale.com/v1";

export async function getNextMessage(apiKey: string, messages: string, message: string) {
  const messageHistory = messages.split("||||").map((m) => {
    if (m.startsWith("<b>Kindllm</b>: ")) {
      return {
        role: "assistant",
        content: m.replace("<b>Kindllm</b>: ", ""),
      };
    } else {
      return {
        role: "user",
        content: m.replace("<b>User</b>: ", ""),
      };
    }
  });

  const systemPrompt = {
    role: "system",
    content:
      "You are a helpful assistant on a a Kindle e-reader, called Kindllm. You get straight to the point with a short answer and a pleasant demeanor.",
  };

  // concatenate the message history with the new message
  const prompt = [systemPrompt, ...messageHistory, { role: "user", content: message }];

  const openai = new OpenAI({
    baseURL: BASE_URL,
    apiKey: apiKey,
  });

  const completion = await openai.chat.completions.create({
    messages: prompt,
    model: MODEL,
  });

  const messageContent = completion.choices[0].message.content || "";

  return messageContent;
}

export async function getSuggestions(apiKey: string, messages: string): Promise<string[]> {
  const messageHistory = messages.split("||||").map((m) => {
    if (m.startsWith("<b>Kindllm</b>: ")) {
      return {
        role: "assistant",
        content: m.replace("<b>Kindllm</b>: ", ""),
      };
    } else {
      return {
        role: "user",
        content: m.replace("<b>User</b>: ", ""),
      };
    }
  });

  const message = messageHistory[messageHistory.length - 1].content;
  const lastMessage = messageHistory[messageHistory.length - 2];

  if (!message || !lastMessage) return [];

  const suggestionsSystemPrompt = {
    role: "system",
    content:
      "You a are a helpful assistant that generates insightful follow-up questions. You're reply is always formatted as a JSON object with a suggestions array.",
  };

  const suggestionsPrompt = [
    suggestionsSystemPrompt,
    lastMessage,
    { role: "assistant", content: message },
    { role: "user", content: "List three good follow-up questions:" },
  ] as ChatCompletionMessageParam[];

  const openai = new OpenAI({
    baseURL: BASE_URL,
    apiKey: apiKey,
  });

  const response = await openai.chat.completions.create({
    messages: suggestionsPrompt,
    model: MODEL,
    response_format: {
      type: "json_object",
    },
  });

  const jsonContent = JSON.parse(response.choices[0].message.content || "{}");
  return jsonContent?.suggestions || [];
}
