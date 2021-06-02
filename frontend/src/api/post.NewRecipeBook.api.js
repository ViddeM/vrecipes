import {postRequest} from "./RequestUtilities";

export function postNewRecipeBook(book) {
    const data = getRecipeBookData(book)
    return postRequest("/books", data);
}

export function getRecipeBookData(book) {
    return {
        name: book.name,
        author: book.author,
        recipes: book.selected.map(s => parseInt(s)),
        images: [
            book.image.id
        ]
    }
}