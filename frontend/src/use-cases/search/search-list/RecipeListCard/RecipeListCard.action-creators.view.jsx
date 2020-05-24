import {ON_RECIPE_CARD_CLICKED} from "./RecipeListCard.actions.view";

export function onRecipeCardClicked(recipeID) {
    return {
        type: ON_RECIPE_CARD_CLICKED,
        payload: {
            recipe: recipeID
        },
        error: false
    };
}