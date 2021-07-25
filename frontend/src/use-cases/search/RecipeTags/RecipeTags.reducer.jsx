import {ON_RECIPE_TAGS_SEARCH_FIELD_CHANGE} from "./RecipeTags.actions";

const mockTags = [
    {
        name: "vegetariskt",
        description: "A longer, cooler description of the tag that might " +
        "be spread out on two lines!",
        color: {
            r: 0,
            g: 0,
            b: 0
        },
        recipeCount: 15,
        author: {
            id: 0,
            name: "Vidar Magnusson"
        }
    },
    {
        name: "laktosfritt",
        description: "Bra för de som inte laktosen tål",
        color: {
            r: 200,
            g: 15,
            b: 200
        },
        recipeCount: 4,
        author: {
            id: 2,
            name: ""
        }
    },
    {
        name: "fisk",
        description: "Simmar ej längre",
        color: {
            r: 0,
            g: 110,
            b: 200
        },
        recipeCount: 0,
        author: {
            id: 1,
            name: "Karl-Bertil Johnsson"
        }
    }
]

const initialState = {
    searchText: "",
    tags: mockTags,
    filteredTags: mockTags,
}

export function recipeTags(state = initialState, action) {
    switch (action.type) {
        case ON_RECIPE_TAGS_SEARCH_FIELD_CHANGE:
            let text = action.payload.newValue;
            return Object.assign({}, state, {
                searchText: text,
                filteredTags: state.tags.filter(tag => {
                    return tag.name.includes(text) ||
                    tag.description.includes(text)
                })
            })
        default:
            return state;
    }
}