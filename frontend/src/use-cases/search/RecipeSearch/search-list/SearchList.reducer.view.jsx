import {
    GET_RECIPES_SUCCESSFUL,
    ON_SEARCH_FIELD_CHANGED,
    SEARCH_SET_FILTER_TAGS
} from "../RecipeSearch.actions";

const initialState = {
    recipes: [],
    filteredRecipes: [],
    filterText: "",
    selectedTags: [],
}


export function searchList(state = initialState, action) {
    switch (action.type) {
        case ON_SEARCH_FIELD_CHANGED:
            const search = action.payload.newValue.toLowerCase();
            return Object.assign({}, state, {
                filteredRecipes: filterRecipes(state.recipes,
                                               search,
                                               state.selectedTags
                ),
                filterText: search
            })
        case GET_RECIPES_SUCCESSFUL:
            const recipes = action.payload.response.data.data.recipes;
            return Object.assign({}, state, {
                recipes: recipes,
                filteredRecipes: filterRecipes(recipes,
                                               state.filterText,
                                               state.selectedTags
                )
            });
        case SEARCH_SET_FILTER_TAGS:
            const selectedTags = action.payload.tags
            return Object.assign({}, state, {
                filteredRecipes: filterRecipes(state.recipes,
                                               state.filterText,
                                               selectedTags
                ),
                selectedTags: selectedTags
            })
        default:
            return state;
    }
}

function filterRecipes(recipes, search, selectedTags) {
    const selectedTagIds = selectedTags.map(tag => tag.id);
    // Tag filter
    const tagFilter = selectedTagIds.length === 0
                      ? recipes
                      : recipes.filter(
    recipe => {
        const recipeTagIds = recipe.tags.map(tag => tag.id);
        for (let i = 0; i < selectedTagIds.length; i++) {
            if (recipeTagIds.includes(selectedTagIds[i]) === false) {
                return false;
            }
        }
        return true;
    })

    // Search text filter
    return tagFilter.filter(
    recipe => {
        // Search name
        const name = recipe.name.toLowerCase();
        if (name.includes(search)) {
            return true;
        }

        // Search author
        const author = recipe.author.name.toLowerCase();
        if (author.includes(search)) {
            return true
        }

        // Search tags
        for (let i = 0; i < recipe.tags.length; i++) {
            // First check search text matches for tags
            const tagName = recipe.tags[i].name.toLowerCase();
            if (tagName.includes(search)) {
                return true;
            }
        }

        return false;
    });
}
