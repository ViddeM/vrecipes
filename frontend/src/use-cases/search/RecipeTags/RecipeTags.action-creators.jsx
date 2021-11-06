import {
    DELETE_TAG_FAILED,
    DELETE_TAG_SUCCESSFUL,
    LOAD_TAGS_FAILED,
    LOAD_TAGS_SUCCESSFUL,
    ON_RECIPE_TAGS_SEARCH_FIELD_CHANGE,
    ON_SET_CREATING_TAG
} from "./RecipeTags.actions";
import {authorizedApiCall} from "../../../common/functions/authorizedApiCall";
import {getTags} from "../../../api/get.Tags.api";
import {handleError} from "../../../common/functions/handleError";
import {FAILED_TO_LOAD_RECIPES} from "../../../common/translations/ResponseMessages";
import {deleteTag} from "../../../api/delete.Tag.api";

export function recipeTagsSearchChanged(newText) {
    return {
        type: ON_RECIPE_TAGS_SEARCH_FIELD_CHANGE,
        payload: {
            newValue: newText
        },
        error: false
    }
}

export function setCreatingTag(creatingTag) {
    return {
        type: ON_SET_CREATING_TAG,
        payload: {
            creatingTag: creatingTag
        },
        error: false
    }
}

export function loadTags() {
    return dispatch => {
        authorizedApiCall(getTags)
        .then(response => {
            if (response.error) {
                return dispatch(onLoadTagsFailed(response.errResponse))
            } else {
                return dispatch(onLoadTagsSuccessful(response.response))
            }
        }).catch(error => {
            return dispatch(onLoadTagsFailed(error))
        })
    }
}

function onLoadTagsSuccessful(response) {
    return {
        type: LOAD_TAGS_SUCCESSFUL,
        payload: {
            response
        },
        error: false
    }
}

function onLoadTagsFailed(error) {
    return handleError(error, LOAD_TAGS_FAILED, FAILED_TO_LOAD_RECIPES);
}

export function handleDeleteTag(tagId) {
    return dispatch => {
        authorizedApiCall(() => deleteTag(tagId))
        .then(response => {
            if (response.error) {
                return dispatch(onDeleteTagFailed(response.errResponse))
            } else {
                return dispatch(onDeleteTagSuccessful(response.response))
            }
        }).catch(error => {
            return dispatch(onDeleteTagFailed(error))
        })

    }
}

function onDeleteTagSuccessful(response) {
    alert("Lyckades ta bort tag!")

    return {
        type: DELETE_TAG_SUCCESSFUL,
        payload: {
            response
        },
        error: false
    }
}

function onDeleteTagFailed(error) {
    alert("Misslyckades med att ta bort tagg")
    return handleError(error, DELETE_TAG_FAILED)
}
