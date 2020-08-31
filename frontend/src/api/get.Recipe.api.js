import {getRequest} from "./RequestUtilities";

export function getRecipe(recipeId) {
    return getRequest("/recipe/details/" + recipeId);
}