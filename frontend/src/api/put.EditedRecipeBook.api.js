import {putRequest} from "./RequestUtilities";
import {getRecipeBookData} from "./post.NewRecipeBook.api";

export function putEditedRecipeBook(book) {
    const data = getRecipeBookData(book)
    return putRequest("/books/" + book.id, data);
}
