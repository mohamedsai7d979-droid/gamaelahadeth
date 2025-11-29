import { GoogleGenAI, Type } from "@google/genai";
import { Hadith } from "../types";

// Initialize Gemini Client
// Note: process.env.API_KEY is assumed to be available in the environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const MODEL_NAME = 'gemini-2.5-flash';

export const searchHadiths = async (query: string): Promise<Hadith[]> => {
  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: `You are an expert Islamic Scholar and Muhaddith. 
      The user is searching for Hadiths related to: "${query}".
      
      Please find up to 5 relevant Hadiths. 
      Return the result in strictly valid JSON format.
      The output should be an array of objects.
      
      Fields required for each Hadith:
      - id: A unique string ID.
      - text: The Arabic text of the Hadith (Matn).
      - narrator: The Companion who narrated it (Arabic).
      - book: The source book (e.g., Sahih Al-Bukhari).
      - grade: The authenticity grade (Sahih, Hasan, Da'eef, Mawdoo').
      - explanation: A brief, clear explanation of the meaning in Arabic (Sharh).
      - tags: Array of 3 key topics (Arabic).
      
      Ensure the Arabic is accurate and diacritics (Tashkeel) are used where helpful but not excessive.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              text: { type: Type.STRING },
              narrator: { type: Type.STRING },
              book: { type: Type.STRING },
              grade: { type: Type.STRING },
              explanation: { type: Type.STRING },
              tags: { 
                type: Type.ARRAY,
                items: { type: Type.STRING }
              }
            },
            required: ["id", "text", "narrator", "book", "grade", "explanation", "tags"]
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as Hadith[];
    }
    return [];
  } catch (error) {
    console.error("Error fetching Hadiths:", error);
    throw new Error("حدث خطأ أثناء البحث عن الأحاديث. يرجى المحاولة مرة أخرى.");
  }
};

export const getHadithOfTheDay = async (): Promise<Hadith> => {
  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: `Provide one famous, authentic (Sahih) Hadith about good character or patience.
      Return strictly valid JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            text: { type: Type.STRING },
            narrator: { type: Type.STRING },
            book: { type: Type.STRING },
            grade: { type: Type.STRING },
            explanation: { type: Type.STRING },
            tags: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["id", "text", "narrator", "book", "grade", "explanation", "tags"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as Hadith;
    }
    throw new Error("Empty response");
  } catch (error) {
    console.error("Error fetching Hadith of the day:", error);
    // Fallback static data if API fails on init
    return {
      id: "fallback-1",
      text: "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى",
      narrator: "عمر بن الخطاب",
      book: "صحيح البخاري",
      grade: "صحيح",
      explanation: "هذا الحديث هو قاعدة عظيمة من قواعد الإسلام، وفيه أن قبول الأعمال عند الله وصلاحها متعلق بالنية.",
      tags: ["النية", "الإخلاص", "أصول الدين"]
    };
  }
};