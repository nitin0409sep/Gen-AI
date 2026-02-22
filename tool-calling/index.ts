import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function main() {
    const completions = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        temperature: 0,
        messages: [
            {
                role: "system",
                content: `You are a smart personal assistant who answers the asked questions. Please provide your response in JSON format. 
                    U have access to following tool:
                    1. searchWeb({query}: {query: string}), //"Search the latest information and realtime data on the internet."
                `,
            },
            {
                role: "user",
                content: "When was iphone16 launched?",
                // content: "What is current weather in Noida and also current date and time?",
            },
        ],
        tools: [
            {
                type: "function",
                function: {
                    name: "webSearch",
                    description: "Search the latest information and realtime data on the internet.", // description is v imp, it helps LLM to understand what this tool does
                    parameters: {
                        type: "object",
                        properties: {
                            query: {
                                type: "string",
                                description: "The search query to perform search on.",
                            },
                        },
                        required: ["query"],
                    },
                },
            },
        ],
        tool_choice: "auto",
    });

    console.log(JSON.stringify(completions.choices[0]?.message, null, 2));
}

main();
