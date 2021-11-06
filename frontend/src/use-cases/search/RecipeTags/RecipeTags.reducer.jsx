import {
    LOAD_TAGS_SUCCESSFUL,
    ON_RECIPE_TAGS_SEARCH_FIELD_CHANGE,
    ON_SET_CREATING_TAG
} from "./RecipeTags.actions";
import {
    ON_CREATE_NEW_TAG_FAILED,
    ON_CREATE_NEW_TAG_SUCCESSFUL
} from "./create-tag/CreateTag.actions";

const initialState = {
    searchText: "",
    tags: [],
    filteredTags: [],
    creatingTag: false,
    createTagError: "",
    update: false
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
        case ON_SET_CREATING_TAG:
            return Object.assign({}, state, {
                creatingTag: action.payload.creatingTag,
                createTagError: ""
            })
        case ON_CREATE_NEW_TAG_FAILED:
            return Object.assign({}, state, {
                createTagError: action.payload.message
            })
        case ON_CREATE_NEW_TAG_SUCCESSFUL:
            // Reload page?
            return Object.assign({}, state, {
                createTagError: "",
                creatingTag: false,
                update: true
            })
        case LOAD_TAGS_SUCCESSFUL:
            const tags = action.payload.response.data.data.tags;
            return Object.assign({}, state, {
                tags: tags,
                filteredTags: tags,
                update: false
            })
        default:
            return state;
    }
}