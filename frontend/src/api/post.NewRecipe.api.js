import {postRequest} from "./RequestUtilities";

export function postNewRecipe(recipe) {
    const data = getRecipeData(recipe)
    return postRequest("/recipes", data);
}

export function getRecipeData(recipe) {
    const ingredients = recipe.ingredients.map(ingredient => {
        return {
            name: ingredient.name,
            unit: ingredient.unit,
            amount: parseFloat(ingredient.amount),
        }
    });
    const steps = recipe.steps.map(step => {
        return {
            step: step.step,
            number: step.number
        }
    })
    const images = recipe.images.map(image => {
        return {
            id: image.id
        }
    })

    return {
        name: recipe.recipeName,
        description: recipe.description,
        cookingTime: recipe.cookingTime !== undefined ? parseInt(recipe.cookingTime) : -1,
        ovenTemperature: recipe.ovenTemperature !== undefined ? parseInt(recipe.ovenTemperature) : -1,
        ingredients: ingredients,
        images: images,
        steps: steps,
        tags: recipe.selectedTags
    }
}