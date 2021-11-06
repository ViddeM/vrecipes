import {
    DELETE_TAG_FAILED,
    DELETE_TAG_SUCCESSFUL,
    LOAD_TAGS_SUCCESSFUL,
    ON_EDIT_TAG,
    ON_RECIPE_TAGS_SEARCH_FIELD_CHANGE,
    ON_SET_CREATING_TAG
} from "./RecipeTags.actions";
import {
    ON_CREATE_NEW_TAG_FAILED,
    ON_CREATE_NEW_TAG_SUCCESSFUL,
    ON_EDIT_TAG_SAVE_FAILED
} from "./create-tag/CreateTag.actions";

const initialState = {
    searchText: "",
    tags: [],
    filteredTags: [],
    creatingTag: false,
    createTagError: "",
    update: false,
    editTag: {
        edit: false,
        name: undefined,
        description: undefined,
        color: undefined,
        tagId: undefined,
    }
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
                createTagError: "",
                editTag: {
                    name: undefined,
                    description: undefined,
                    color: undefined,
                    tagId: undefined,
                    edit: false
                }
            })
        case ON_CREATE_NEW_TAG_FAILED:
        case ON_EDIT_TAG_SAVE_FAILED:
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
        case DELETE_TAG_SUCCESSFUL:
            return Object.assign({}, state, {
                update: true
            })
        case DELETE_TAG_FAILED:
            return state
        case ON_EDIT_TAG:
            let tag = action.payload.tag;
            return Object.assign({}, state, {
                creatingTag: true,
                editTag: {
                    name: tag.name,
                    description: tag.description,
                    color: tag.color,
                    tagId: tag.id,
                    edit: true
                }
            })
        default:
            return state;
    }
}