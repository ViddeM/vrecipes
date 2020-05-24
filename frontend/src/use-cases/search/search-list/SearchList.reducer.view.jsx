import {ON_SEARCH_FIELD_CHANGED} from "../Search.actions";

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
    /*,
    {
        id: "4",
        name: "Ungsbakad lax",
        author: "Jacob"
    },
    {
        id: "5",
        name: "Ungsbakad lax",
        author: "Jacob"
    }*/
];

const initialState = {
    recipes: mockRecipes,
    filteredRecipes: mockRecipes
}


export function searchList(state = initialState, action) {
    switch (action.type) {
        case ON_SEARCH_FIELD_CHANGED:
            const search = action.payload.newValue.toLowerCase();

            let newFilteredRecipes = state.recipes.filter(recipe => {
                return recipe.name.toLowerCase().includes(search) || recipe.author.toLowerCase().includes(search);
            })
            return Object.assign({}, state, {
                filteredRecipes: newFilteredRecipes
            })
        default:
            return state;
    }
}
