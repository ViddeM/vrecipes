import {getRequest} from "./RequestUtilities";

export function getRecipeBooks() {
    return getRequest("/books/");
}