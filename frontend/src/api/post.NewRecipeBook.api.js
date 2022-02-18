import {postRequest} from "./RequestUtilities";

export function postNewRecipeBook(book) {
    const data = getRecipeBookData(book)
    return postRequest("/books", data);
}

export function getRecipeBookData(book) {
    let images = []
    if (book.image) {
        images.push(book.image.id);
    }
    return {
        name: book.name,
        author: book.author,
        recipes: book.selected,
        images: images
    }
}