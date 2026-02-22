import { tavily } from "@tavily/core";

const tvly = tavily({ apiKey: process.env.TAVILY_API_KEY });

// This is a Tool -> Tool is nothing but a function
export const webSearch = async ({ query }: { query: string }) => {
    const response = await tvly.search(query); // Default Max Result - 5
    const resString = response.results.map((res) => res.content).join("\n\n"); // Just 2 line gap
    return resString;
};
