// @ts-check
import "dotenv/config";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function main() {
  const chatCompletion = await getGroqChatCompletion();
  // Print the completion returned by the LLM.
  console.log(chatCompletion?.choices[0].message.content);
}

export async function getGroqChatCompletion() {
  return groq.chat.completions.create({
    temperature: 1, // As temp increases it gives output randomly - Ranges b/w 0.0 to 2 -> By default it's 1. 0 - Focused, 0.8 or 1 - ceative + focused
    // top_p: 0.1, // Aternative of temp, not recommended to use both Temp and Top_p together. Range 0 to 1
    /**
     * 1. item 1
     * 2. item 2
     * 3. item 3
     * 4. item 4
     * ...
     * ...
     * ...
     * 11. item 11
     */
    stop: "11", // Stop Sequence -> As out LLM will see 11, it will stop generation fuurther // Can't used with js response
    max_completion_tokens: 1000, // Limit output of the model,
    frequency_penalty: -1, // Range - (-2 to 2) -> If u dont want LLM to use repetative word multiple times in the output then u can increases the frequency_penalty. As high the frequency_penalty the less number of repetative words
    model: "openai/gpt-oss-20b",
    response_format: { 'type': "json_object" },
    messages: [
      {
        role: "system",
        content: `You are Jarvis, a smart review grader. Your task is to analyse given review and return the sentiment. Classify the review as, Positive, Negative or Neutral.
        You must return response valid JSON structure.
        Example : {"sentiment" :  "Negative"}
        `,
        // content: "You are Jarvis, a smart personal assistant. Be always polite.", // We provide persona or behaviour to our LLM over here. It's Optional but recommended
      },
      {
        role: "user",
        content: `
            Review : These headphones arrived quickly and look great, but the left earcup stopped working after a week.
            Sentiment: 
        `,
      },
    ],
  });
}

main();
