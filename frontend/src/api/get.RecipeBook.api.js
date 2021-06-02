import {getRequest} from "./RequestUtilities";

export function getRecipeBook(bookId) {
    return getRequest("/books/" + bookId);
}