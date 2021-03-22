import {getRecipeData} from "./post.NewRecipe.api";
import {putRequest} from "./RequestUtilities";

export function putEditedRecipe(recipe) {
    const data = getRecipeData(recipe)
    return putRequest("/recipes/" + recipe.id, data);
}
