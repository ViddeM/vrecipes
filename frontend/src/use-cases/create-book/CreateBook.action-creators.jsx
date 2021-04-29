import {
    ON_RECIPE_BOOK_AUTHOR_CHANGE,
    ON_RECIPE_BOOK_NAME_CHANGE
} from "./CreateBook.actions";

export function onBookNameChange(newName) {
    return {
        type: ON_RECIPE_BOOK_NAME_CHANGE,
        payload: {
            newName: newName.target.value
        },
        error: false
    }
}

export function onBookAuthorChange(newAuthor) {
    return {
        type: ON_RECIPE_BOOK_AUTHOR_CHANGE,
        payload: {
            newAuthor: newAuthor.target.value
        },
        error: false
    }
}