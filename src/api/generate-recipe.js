import { GoogleGenerativeAI } from "@google/generative-ai";


export default async function handler(req, res) {
  
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {
    
    const { ingredients } = req.body;

   
    if (!ingredients || !Array.isArray(ingredients)) {
      return res.status(400).json({
        error: "Ingredients must be an array"
      });
    }

    if (ingredients.length === 0) {
      return res.status(400).json({
        error: "Please provide at least one ingredient"
      });
    }

    
    const genAI = new GoogleGenerativeAI(
      process.env.GEMINI_API_KEY
    );

    const model = genAI.getGenerativeModel({
      model: "gemini-pro"
    });

    
    const prompt = `
You are an AI chef.

The user has the following ingredients:
${ingredients.join(", ")}

Task:
- Suggest ONE recipe
- Give recipe name
- Mention cooking time
- List ingredients
- Give step-by-step instructions
- Beginner friendly
- Format response using markdown
`;

   
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const recipeText = response.text();

    
    return res.status(200).json({
      recipe: recipeText
    });

  } catch (error) {
    console.error("Gemini Error:", error);

    return res.status(500).json({
      error: "Failed to generate recipe"
    });
  }
}
