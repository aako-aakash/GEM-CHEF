import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body =
      typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    const ingredients = body?.ingredients;

    if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
      return res.status(400).json({
        error: "Ingredients must be a non-empty array"
      });
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY
    });

    // ✅ CORRECT MODEL
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `
You are an AI chef.

Ingredients:
${ingredients.join(", ")}

Task:
- Suggest ONE recipe
- Give recipe name
- Cooking time
- Ingredients list
- Step-by-step instructions
- Beginner friendly
- Format the response in Markdown
`
            }
          ]
        }
      ]
    });

    return res.status(200).json({
      recipe: response.text
    });

  } catch (error) {
    console.error("Gemini API Error:", error);
    return res.status(500).json({
      error: error.message
    });
  }
}
