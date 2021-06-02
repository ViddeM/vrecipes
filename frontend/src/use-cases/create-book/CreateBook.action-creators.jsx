import {
    ON_RECIPE_BOOK_AUTHOR_CHANGE,
    ON_RECIPE_BOOK_NAME_CHANGE,
    ON_RECIPE_BOOK_SAVE_AWAIT_RESPONSE,
    ON_RECIPE_BOOK_SAVE_FAILED,
    ON_RECIPE_BOOK_SAVE_SUCCESSFUL,
    ON_RECIPE_BOOK_VALIDATION_FAILED
} from "./CreateBook.actions";
import {authorizedApiCall} from "../../common/functions/authorizedApiCall";
import {postNewRecipeBook} from "../../api/post.NewRecipeBook.api";
import {handleError} from "../../common/functions/handleError";

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

export function onRecipeBookSave(book) {
    const errors = validateRecipeBook(book)

    if (Object.keys(errors).length === 0) {
        return dispatch => {
            dispatch({type: ON_RECIPE_BOOK_SAVE_AWAIT_RESPONSE, error: false})
            authorizedApiCall(() => postNewRecipeBook(book))
            .then(response => {
                if (response.error) {
                    dispatch(onRecipeBookSaveFailed(response.errResponse))
                } else {
                    if (response.response.data.success === false) {
                        dispatch(onRecipeBookSaveFailed(response.response.data))
                    } else {
                        dispatch(onRecipeBookSaveSuccessful(response.response));
                    }
                }
            })
            .catch(error => {
                dispatch(onRecipeBookSaveFailed(error));
            })
        }
    }

    return {
        type: ON_RECIPE_BOOK_VALIDATION_FAILED,
        payload: {
            errors: errors
        },
        error: false
    }
}

function onRecipeBookSaveSuccessful(response) {
    return {
        type: ON_RECIPE_BOOK_SAVE_SUCCESSFUL,
        payload: {
            book: response.data.data.recipeBookUniqueName
        }
    }
}

function onRecipeBookSaveFailed(error) {
    return handleError(error, ON_RECIPE_BOOK_SAVE_FAILED, "Kunde inte spara receptbok, försök igen senare.");
}


function validateRecipeBook(book) {
    let errors = {}

    if (book.name.length <= 0) {
        errors = {
            ...errors,
            name: "Receptboken måste ha ett namn!"
        }
    }

    return errors
}