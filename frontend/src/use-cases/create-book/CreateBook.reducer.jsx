import {
    ON_RECIPE_BOOK_AUTHOR_CHANGE,
    ON_RECIPE_BOOK_NAME_CHANGE
} from "./CreateBook.actions";
import {
    GET_RECIPES_FAILED,
    GET_RECIPES_SUCCESSFUL
} from "../search/RecipeSearch/RecipeSearch.actions";
import {ON_RECIPE_ROW_SELECTION_CHANGE} from "./CreateBookRecipeTable/RecipeTable.actions";
import {
    REMOVE_BOOK_IMAGE,
    UPLOAD_BOOK_IMAGE_AWAIT_RESPONSE, UPLOAD_BOOK_IMAGE_FAILED,
    UPLOAD_BOOK_IMAGE_SUCCESSFUL
} from "./UploadImages/UploadImages.actions";

const initialState = {
    name: "Lol receptbok",
    author: "Gustav II Adolf",
    recipes: [
        {id: 1, uniqueName: "asd", recipeName: 'Recept 1', uploadedBy: 'Vidde'},
        {id: 2, uniqueName: "asd", recipeName: 'Recept 2', uploadedBy: 'LP'},
        {id: 3, uniqueName: "asd", recipeName: 'Farmors tårta', uploadedBy: 'Rosen'},
        {id: 4, uniqueName: "asd", recipeName: 'Recept 1', uploadedBy: 'Vidde'},
        {id: 5, uniqueName: "asd", recipeName: 'Recept 2', uploadedBy: 'LP'},
        {id: 6, uniqueName: "asd", recipeName: 'Farmors tårta', uploadedBy: 'Rosen'},
        {id: 7, uniqueName: "asd", recipeName: 'Recept 1', uploadedBy: 'Vidde'},
        {id: 8, uniqueName: "asd", recipeName: 'Recept 2', uploadedBy: 'LP'},
        {id: 9, uniqueName: "asd", recipeName: 'Farmors tårta', uploadedBy: 'Rosen'},
        {id: 10, uniqueName: "asd",  recipeName: 'Recept 1', uploadedBy: 'Vidde'},
        {id: 11, uniqueName: "asd",  recipeName: 'Recept 2', uploadedBy: 'LP'},
        {id: 12, uniqueName: "asd",  recipeName: 'Farmors tårta', uploadedBy: 'Rosen'},
        {id: 13, uniqueName: "asd",  recipeName: 'Recept 1', uploadedBy: 'Vidde'},
        {id: 14, uniqueName: "asd",  recipeName: 'Recept 2', uploadedBy: 'LP'},
        {id: 15, uniqueName: "asd",  recipeName: 'Farmors tårta', uploadedBy: 'Rosen'},
        {id: 16, uniqueName: "asd",  recipeName: 'Recept 1', uploadedBy: 'Vidde'},
        {id: 17, uniqueName: "asd",  recipeName: 'Recept 2', uploadedBy: 'LP'},
        {id: 18, uniqueName: "asd",  recipeName: 'Farmors tårta', uploadedBy: 'Rosen'},
        {id: 19, uniqueName: "asd",  recipeName: 'Recept 1', uploadedBy: 'Vidde'},
        {id: 20, uniqueName: "asd",  recipeName: 'Recept 2', uploadedBy: 'LP'},
        {id: 21, uniqueName: "asd",  recipeName: 'Farmors tårta', uploadedBy: 'Rosen'},
        {id: 22, uniqueName: "asd",  recipeName: 'Recept 1', uploadedBy: 'Vidde'},
        {id: 23, uniqueName: "asd",  recipeName: 'Recept 2', uploadedBy: 'LP'},
        {id: 24, uniqueName: "asd",  recipeName: 'Farmors tårta', uploadedBy: 'Rosen'},
        {id: 25, uniqueName: "asd",  recipeName: 'Recept 1', uploadedBy: 'Vidde'},
        {id: 26, uniqueName: "asd",  recipeName: 'Recept 2', uploadedBy: 'LP'},
        {id: 27, uniqueName: "asd",  recipeName: 'Farmors tårta', uploadedBy: 'Rosen'},
        {id: 28, uniqueName: "asd",  recipeName: 'Recept 1', uploadedBy: 'Vidde'},
        {id: 29, uniqueName: "asd",  recipeName: 'Recept 2', uploadedBy: 'LP'},
        {id: 30, uniqueName: "asd",  recipeName: 'Farmors tårta', uploadedBy: 'Rosen'}
    ],
    error: "",
    selected: [],
    image: null,
    imageUploadError: "",
    uploadingImage: false
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
                error: action.payload.message
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
        default:
            return state;
    }
}

function newState(oldState, changes) {
    return Object.assign({
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