import {deleteRequest} from "./RequestUtilities";

export function deleteRecipeBook(bookId) {
    return deleteRequest("/books/" + bookId)
}