import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // 🔒 SAFELY PARSE BODY
    const body =
      typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    const ingredients = body?.ingredients;

    if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
      return res.status(400).json({
        error: "Ingredients must be a non-empty array"
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "Gemini API key missing" });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "models/gemini-1.5-flash"
    });

    const prompt = `
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
- Markdown format
`;

    const result = await model.generateContent(prompt);
    const recipeText = result.response.text();

    return res.status(200).json({ recipe: recipeText });

  } catch (error) {
    console.error("Gemini backend error:", error);
    return res.status(500).json({
      error: "Failed to generate recipe"
    });
  }
}
