import React from "react"
import IngredientsList from "./Components/IngredientsList"
import ClaudeRecipe from "./Components/ClaudeRecipe"

export default function Main() {

    const [ingredients, setIngredients] = React.useState([])

    const [recipe, setRecipe] = React.useState("")
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState("")

   
    async function getRecipe() {
        setLoading(true);
        setError("");
        setRecipe("");

        try {
            const response = await fetch("/api/generate-recipe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ingredients: ingredients
                }),
            });

            const data = await response.json(); // ✅ always read JSON

            if (!response.ok) {
                // ✅ show backend error message
                throw new Error(data.error || "Failed to generate recipe");
            }

            setRecipe(data.recipe);

        } catch (err) {
            console.error("Frontend error:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }


    // 🔹 Add ingredient from form
    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")
        setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }

    return (
        <main>
            <form action={addIngredient} className="add-ingredient-form">
                <input
                    className="list-input"
                    type="text"
                    placeholder="e.g. Turmeric"
                    aria-label="Add ingredient"
                    name="ingredient"
                    required
                />
                <button>Add ingredient</button>
            </form>

            {ingredients.length > 0 &&
                <IngredientsList
                    ingredients={ingredients}
                    getRecipe={getRecipe}
                    loading={loading}
                />
            }

            {loading && <p>⏳ Generating recipe...</p>}
            {error && <p className="error">❌ {error}</p>}


            {recipe && <ClaudeRecipe recipe={recipe} />}
        </main>
    )
}
