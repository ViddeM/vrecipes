import {ON_SEARCH_FIELD_CHANGED} from "../Search.actions";
import {GET_RECIPES_SUCCESSFUL} from "../../../app/App.actions";

const mockRecipes = [
    {
        id: "0",
        name: "ChokladBollar",
        image: "/static/images/chokladbollar.jpg",
        author: "Vidar"
    },
    {
        id: "1",
        name: "Sphagetti & Köttfärssås",
        image: "/static/images/temp_image.jpg",
        author: "Eric"
    },
    {
        id: "2",
        name: "Ungsbakad lax",
        author: "Jacob"
    },
    {
        id: "3",
        name: "Ungsbakad lax",
        author: "Jacob"
    }
];

const initialState = {
    recipes: mockRecipes,
    filteredRecipes: mockRecipes,
    filterText: ""
}


export function searchList(state = initialState, action) {
    switch (action.type) {
        case ON_SEARCH_FIELD_CHANGED:
            const search = action.payload.newValue.toLowerCase();
            return Object.assign({}, state, {
                filteredRecipes: filterRecipes(state.recipes, search),
                filterText: search
            })
        case GET_RECIPES_SUCCESSFUL:
            return state;
            console.log("Retrieved recipes: ", action.payload.response);
            const recipes = action.payload.data.recipes;
            return Object.assign({}, state, {
                recipes: recipes,
                filteredRecipes: filterRecipes(recipes, state.search)
            });
        default:
            return state;
    }
}

function filterRecipes(recipes, search) {
    return recipes.filter(recipe => {
        return recipe.name.toLowerCase().includes(search) || recipe.author.toLowerCase().includes(search);
    })
}
