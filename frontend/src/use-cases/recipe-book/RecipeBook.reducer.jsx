import {
    BACK_TO_BOOK_SEARCH,
    EDIT_RECIPE_BOOK,
    LOAD_RECIPE_BOOK_FAILED,
    LOAD_RECIPE_BOOK_SUCCESSFUL,
    RESET_RECIPE_BOOK
} from "./RecipeBook.actions";

const mockBook = {
    name: "LPs lilla spritlista",
    author: "Eric Carlsson",
    uploadedBy: {
        name: "Vidar Magnusson"
    },
    recipes: [
        {
            name: "Some recipe",
            uniqueName: "some_unique_name",
            author: "Vidar Magnusson"
        },
        {
            name: "Some recipe 2",
            uniqueName: "some_unique_name_2",
            author: "Pelle"
        },
        {
            name: "Some recipe 3",
            uniqueName: "some_unique_name_3",
            author: "Kalle"
        },
        {
            name: "Some recipe with long name lol qasdasdasd 123123123 asddsjghdfsiugaluigadfiugfdluigd",
            uniqueName: "some_unique_name_4",
            author: "Ada lasd aga e a  ggggg 333 scvcvx  qq"
        }
    ],
    image: {
        path: "",
        id: 0,
    }
}

const initialState = {
    error: null,
    book: null,
    redirectTo: "",
}

export function book(state = initialState, action) {
    switch (action.type) {
        case LOAD_RECIPE_BOOK_SUCCESSFUL:
            return Object.assign({}, state, handleRecipeBookResponse(action.payload.response.data.data));
        case LOAD_RECIPE_BOOK_FAILED:
            return Object.assign({}, state, {
                error: action.payload,
                redirectTo: ""
            })
        case BACK_TO_BOOK_SEARCH:
            return Object.assign({}, state, {
                redirectTo: "/books"
            })
        case EDIT_RECIPE_BOOK:
            return Object.assign({}, state, {
                redirectTo: "/book/create"
            })
        case RESET_RECIPE_BOOK:
            return initialState
        default:
            return state
    }
}

function handleRecipeBookResponse(recipeBook) {
    return {
        error: null,
        book: {
            id: recipeBook.id,
            name: recipeBook.name,
            uploadedBy: recipeBook.uploadedBy,
            author: recipeBook.author,
            recipes: recipeBook.recipes,
            image: recipeBook.image
        },
        redirectTo: "",
    }
}