import {getRequest} from "./RequestUtilities";

export function getRecipes() {
    return getRequest("/recipes");
}