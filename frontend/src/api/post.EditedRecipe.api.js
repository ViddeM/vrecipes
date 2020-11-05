import {postRequest} from "./RequestUtilities";
import {getRecipeData} from "./post.NewRecipe.api";

export function postEditedRecipe(recipe) {
    const data = getRecipeData(recipe)
    return postRequest("/recipe/edit/" + recipe.id, data);
}
