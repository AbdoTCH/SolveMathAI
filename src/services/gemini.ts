import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface MathSolution {
  title: string;
  unknowns: string;
  equations: string;
  resolution: string;
  verification: string;
  conclusion: string;
}

const systemInstruction = `You are an expert Math Solver. 
When given a math problem (algebra, geometry, calculus, etc.), you must solve it following a strict 4-step method in French (or bilingual if the user asks, but default to the requested steps):
1. Choix de l'inconnu (Identifying the variables/unknowns)
2. Mise en système/équation (Translating the problem into mathematical sentences/equations)
3. Résolution (Solving the mathematical problem step-by-step)
4. Vérification (Verifying the solution and stating the final answer)

Output the result in a JSON format matching the schema provided. 
Provide clear, detailed explanations for each step. 
Use LaTeX for mathematical notation where appropriate (e.g., $x^2$, $\\frac{a}{b}$).`;

export async function solveMathProblem(problem: string): Promise<MathSolution> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: problem,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            unknowns: { type: Type.STRING },
            equations: { type: Type.STRING },
            resolution: { type: Type.STRING },
            verification: { type: Type.STRING },
            conclusion: { type: Type.STRING },
          },
          required: ["title", "unknowns", "equations", "resolution", "verification", "conclusion"],
        },
      },
    });

    const text = response.text;
    if (!text) throw new Error("Empty response from AI");
    return JSON.parse(text) as MathSolution;
  } catch (error) {
    console.error("Error solving math problem:", error);
    throw error;
  }
}
