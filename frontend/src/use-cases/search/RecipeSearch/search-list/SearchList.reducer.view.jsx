import {GET_RECIPES_SUCCESSFUL, ON_SEARCH_FIELD_CHANGED} from "../RecipeSearch.actions";

const initialState = {
    recipes: [],
    filteredRecipes: [],
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
            const recipes = action.payload.response.data.data.recipes;
            return Object.assign({}, state, {
                recipes: recipes,
                filteredRecipes: filterRecipes(recipes, state.filterText)
            });
        default:
            return state;
    }
}

function filterRecipes(recipes, search) {
    return recipes.filter(recipe => {
        return recipe.name.toLowerCase().includes(search) || recipe.author.name.toLowerCase().includes(search);
    })
}
