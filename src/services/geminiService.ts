
import { GoogleGenAI } from "@google/genai";

// Always use named parameter with direct process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateOutreachTemplate = async (alumniName: string, role: string, company: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a professional, warm, and concise outreach message for a student to send to an alumni mentor named ${alumniName} who works as a ${role} at ${company}. 
      The student wants to ask about their experience and potentially a referral. Use a friendly "MSU student to MSU alumni" tone.`,
      config: {
        temperature: 0.7,
      }
    });

    return response.text || `Hi ${alumniName}, I saw your experience at ${company} and would love to learn more about your journey!`;
  } catch (error) {
    console.error("Error generating outreach:", error);
    return `Hi ${alumniName}, I'm a student at MSU and noticed your role at ${company}. I'm very interested in this field and was wondering if you might have 10 minutes to chat about your experience? Thanks!`;
  }
};
