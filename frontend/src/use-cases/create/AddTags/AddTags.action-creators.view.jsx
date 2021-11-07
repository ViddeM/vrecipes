import {ON_TAGS_SELECTED} from "./AddTags.actions.view";

export function selectTags(tags) {
    return {
        type: ON_TAGS_SELECTED,
        payload: {
            tags: tags,
        },
        error: false,
    }
}