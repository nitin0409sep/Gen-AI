import dotenv from "dotenv";
dotenv.config();

import readline from "node:readline/promises";
import Groq from "groq-sdk";
import { webSearch } from "./web-search";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function main() {
    const messages: any = [
        {
            role: "system",
            content: `You are a smart personal assistant who answers the asked questions. 
                      U have access to following tool but use them when required only, don't use them unnecessarily:
                        1. searchWeb({query}: {query: string}), //"Search the latest information and realtime data on the internet."
                `,
        },
        // {
        //     role: "user",
        //     content: "Hey",
        //     // content: "When iPhone 17 was launched ?",
        //     // content: "What is current weather in Noida and also current date and time?",
        // },
    ];

    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

    while (1) {
        const question = await rl.question("You: ");

        if (question === "bye") break;

        messages.push({
            role: "user",
            content: question,
        });

        while (1) {
            const completions = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        temperature: 0,
        messages: messages,
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

            // It says call the tool
            messages.push(completions.choices[0].message);

            const toolCalls = completions.choices[0].message.tool_calls;

            if (!toolCalls) {
        console.log(`Assistant: ${completions.choices[0].message?.content}`);
                break;
            }

            // Tool Calls - Array -> Multiple tools
            for (const tool of toolCalls) {
        const functionName = tool.function.name;
        const functionParams = tool.function.arguments;

        // Check to call the correct tool
        if (functionName === "webSearch") {
            console.log("Calling Web Search....");
            const toolResult = await webSearch(JSON.parse(functionParams));

            // Push Tool result into the Messages
            messages.push({
                tool_call_id: tool.id,
                role: "tool", // When we are pusing tool role
                name: functionName, // Tool Name
                content: toolResult,
            });
        }
            }

            console.log(JSON.stringify(completions.choices[0]?.message, null, 2));
        }
    }

    rl.close();
}

main();
