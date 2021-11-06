import {
    ON_RECIPE_BOOK_AUTHOR_CHANGE,
    ON_RECIPE_BOOK_NAME_CHANGE,
    ON_RECIPE_BOOK_SAVE_FAILED,
    ON_RECIPE_BOOK_SAVE_SUCCESSFUL,
    ON_RECIPE_BOOK_VALIDATION_FAILED
} from "./CreateBook.actions";
import {
    GET_RECIPES_FAILED,
    GET_RECIPES_SUCCESSFUL
} from "../search/RecipeSearch/RecipeSearch.actions";
import {ON_RECIPE_ROW_SELECTION_CHANGE} from "./CreateBookRecipeTable/RecipeTable.actions";
import {
    REMOVE_BOOK_IMAGE,
    UPLOAD_BOOK_IMAGE_AWAIT_RESPONSE,
    UPLOAD_BOOK_IMAGE_FAILED,
    UPLOAD_BOOK_IMAGE_SUCCESSFUL
} from "./UploadImages/UploadImages.actions";
import {
    EDIT_RECIPE_BOOK,
    LOAD_RECIPE_BOOK_AWAIT_RESPONSE
} from "../recipe-book/RecipeBook.actions";
import {CREATE_RECIPE_BOOK} from "../search/RecipeBooks/RecipeBookSearch.actions";

const initialState = {
    id: "",
    name: "",
    author: "",
    recipes: [],
    error: "",
    selected: [],
    image: null,
    imageUploadError: "",
    uploadingImage: false,
    errors: {},
    saveError: "",
    redirectTo: "",
}

export function createBook(state = initialState, action) {
    switch (action.type) {
        case ON_RECIPE_BOOK_NAME_CHANGE:
            return newState(state, {
                name: action.payload.newName
            })
        case ON_RECIPE_BOOK_AUTHOR_CHANGE:
            return newState(state, {
                author: action.payload.newAuthor
            })
        case GET_RECIPES_SUCCESSFUL:
            const recipes = action.payload.response.data.data.recipes;
            return handleGetRecipes(state, recipes)
        case GET_RECIPES_FAILED:
            return newState(state, {
                error: action.payload.message,
                errors: {},
            })
        case ON_RECIPE_ROW_SELECTION_CHANGE:
            return newState(state, {
                selected: action.payload.selected
            })
        case UPLOAD_BOOK_IMAGE_AWAIT_RESPONSE:
            return newState(state, {
                uploadingImage: true
            })
        case UPLOAD_BOOK_IMAGE_SUCCESSFUL:
            return newState(state, {
                uploadingImage: false,
                imageUploadError: "",
                image: {
                    id: action.payload.image_id,
                    url: action.payload.image_url
                }
            })
        case UPLOAD_BOOK_IMAGE_FAILED:
            return newState(state, {
                imageUploadError: action.payload.message,
                uploadingImage: false
            })
        case REMOVE_BOOK_IMAGE:
            return newState(state, {
                image: null
            })
        case ON_RECIPE_BOOK_VALIDATION_FAILED:
            return newState(state, {
                errors: action.payload.errors,
                error: "",
            })
        case ON_RECIPE_BOOK_SAVE_FAILED:
            return newState(state, {
                saveError: action.payload.message,
                errors: {},
                error: "",
            })
        case ON_RECIPE_BOOK_SAVE_SUCCESSFUL:
            return newState(state, {
                saveError: "",
                errors: {},
                error: "",
                redirectTo: "/books/" + action.payload.book
            })
        case LOAD_RECIPE_BOOK_AWAIT_RESPONSE:
            return newState(state, {
                redirectTo: "",
            })
        case EDIT_RECIPE_BOOK:
            return editRecipeBook(state, action.payload.book)
        case CREATE_RECIPE_BOOK:
            return initialState
        default:
            return state;
    }
}

function newState(oldState, changes) {
    return Object.assign({
                             redirectTo: "",
                             error: ""
                         }, oldState, changes)
}

function handleGetRecipes(oldState, recipes) {
    return newState(oldState, {
        recipes: recipes.map(recipe => {
            return {
                id: recipe.id,
                recipeName: recipe.name,
                uniqueName: recipe.unique_name,
                uploadedBy: recipe.author.name
            }
        })
    })
}

function editRecipeBook(state, book) {
    let recipes = book.recipes;

    return newState(initialState, {
        id: book.id,
        name: book.name,
        author: book.author,
        recipes: recipes,
        selected: recipes.map(recipe => recipe.id.toString()),
        image: book.image,
        redirectTo: "",
    })
}