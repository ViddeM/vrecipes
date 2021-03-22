import {deleteRequest} from "./RequestUtilities";

export function deleteRecipe(recipeId) {
    return deleteRequest("/recipes/" + recipeId)
}
