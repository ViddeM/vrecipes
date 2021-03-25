import {BACK_TO_SEARCH, LOAD_RECIPE_FAILED, LOAD_RECIPE_SUCCESSFUL, RESET_RECIPE} from "./Recipe.actions";
import {
    DELETE_RECIPE_FAILED,
    DELETE_RECIPE_SUCCESSFUL,
    EDIT_RECIPE
} from "./screens/RecipeCard/views/recipe-footer/RecipeFooter.actions.view";

const mockRecipe = {
    id: "asd123",
    name: "Chokladbollar",
    imageSrc: "chokladbollar.jpg",
    description: " Dessa chokladbollar får en liten karamellsmak av att smöret först får puttra. Rulla chokladbollarna i kokos eller pärlsocker, det som du själv föredrar. ",
    steps: [
        {
            number: 1,
            description: "Smält smöret"
        },
        {
            number: 2,
            description: "Rör ihop socker, vaniljsocker, kakao, havregryn, kaffe och smöret. Ställ in i kylskåp så att smeten stelnar lite, ca 1 timme."
        }, {
            number: 3,
            description: "Forma bollar. Rulla i pärlsocker (gärna mångfärgat), kokos eller annan garnering. "
        }
    ],
    ingredients: [
        {
            name: "smör",
            amount: "100",
            unit: "g"
        },
        {
            name: "socker",
            amount: "1",
            unit: "dl"
        },
        {
            name: "vaniljsocker",
            amount: "1",
            unit: "msk"
        },
        {
            name: "havregryn",
            amount: "3",
            unit: "dl"
        },
        {
            name: "kallt starkt kaffe",
            amount: "3",
            unit: "msk"
        },
        {
            name: "pärlsocker eller annan garnering",
            amount: "",
            unit: ""
        }
    ],
    estimatedTime: 90,
    ovenTemperature: 200,
    images: [
        {
            id: "asd123",
            url: "asd.com"
        }
    ]
}

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
                redirectTo: "/create"
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
            steps: recipe.steps,
            ingredients: recipe.ingredients,
            estimatedTime: recipe.estimatedTime,
            ovenTemperature: recipe.ovenTemperature,
            images: recipe.images
        },
        redirectTo: ""
    }
}
