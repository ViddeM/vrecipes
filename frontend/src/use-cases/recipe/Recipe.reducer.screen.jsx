import {
    BACK_TO_SEARCH,
    LOAD_RECIPE_FAILED,
    LOAD_RECIPE_SUCCESSFUL,
    RESET_RECIPE
} from "./Recipe.actions";
import {
    DELETE_RECIPE_FAILED,
    DELETE_RECIPE_SUCCESSFUL,
    EDIT_RECIPE
} from "./screens/RecipeCard/views/recipe-footer/RecipeFooter.actions.view";

const initialState = {
    recipe: null,
    error: null,
    redirectTo: ""
}

export function recipe(state = initialState, action) {
    switch (action.type) {
        case LOAD_RECIPE_SUCCESSFUL:
            return Object.assign({}, state, handleRecipeResponse(action.payload.response.data.data));
        case LOAD_RECIPE_FAILED:
            return Object.assign({}, state, {
                error: action.payload,
                redirectTo: ""
            });
        case RESET_RECIPE:
            return initialState;
        case EDIT_RECIPE:
            return Object.assign({}, state, {
                redirectTo: "/recipe/create"
            })
        case BACK_TO_SEARCH:
            return Object.assign({}, state, {
                redirectTo: "/"
            })
        case DELETE_RECIPE_SUCCESSFUL:
            window.location.assign(window.location.origin)
            return state
        case DELETE_RECIPE_FAILED:
            return state
        default:
            return state;
    }
}

function handleRecipeResponse(recipe) {
    return {
        error: null,
        recipe: {
            id: recipe.id,
            name: recipe.name,
            description: recipe.description,
            steps: getSortedSteps(recipe.steps),
            ingredients: recipe.ingredients,
            estimatedTime: recipe.estimatedTime,
            ovenTemperature: recipe.ovenTemperature,
            images: recipe.images,
            author: recipe.author,
            tags: recipe.tags
        },
        redirectTo: ""
    }
}

function getSortedSteps(steps) {
    return steps.sort((a, b) => {
        return a.number - b.number
    })
}