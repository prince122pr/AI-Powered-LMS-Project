import { GoogleGenAI } from "@google/genai";
import { config } from "dotenv";

config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

export async function genResponse(prompt) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }]
    });

    let result = response.text.trim();

    // Take only the first word (in case AI sends a sentence)
    result = result.split(/\s+/)[0];

    console.log("AI Keyword:", result);
    return result;

  } catch (error) {
    console.error("Error generating response:", error);
    return null;
  }
}

