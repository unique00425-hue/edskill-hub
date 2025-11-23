import { GoogleGenAI, Type } from "@google/genai";
import { LearningPath } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateLearningPath = async (topic: string): Promise<LearningPath | null> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Create a structured 5-step learning path for a beginner wanting to learn about "${topic}". Keep descriptions concise.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            topic: { type: Type.STRING },
            steps: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  duration: { type: Type.STRING, description: "Estimated time e.g. '2 weeks'" },
                  resources: { 
                    type: Type.ARRAY, 
                    items: { type: Type.STRING },
                    description: "2-3 keywords for what to search for"
                  }
                },
                required: ["title", "description", "duration", "resources"]
              }
            }
          },
          required: ["topic", "steps"]
        }
      }
    });

    const text = response.text;
    if (!text) return null;
    return JSON.parse(text) as LearningPath;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return null;
  }
};