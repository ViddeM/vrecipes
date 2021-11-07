import {
    ON_INGREDIENT_AMOUNT_CHANGE,
    ON_INGREDIENT_CREATED,
    ON_INGREDIENT_DRAG_END,
    ON_INGREDIENT_NAME_CHANGE,
    ON_INGREDIENT_REMOVED,
    ON_INGREDIENT_UNIT_CHANGE
} from "./CreateIngredients/CreateIngredients.actions.view";
import {
    ON_STEP_CREATED,
    ON_STEP_DESCRIPTION_CHANGE,
    ON_STEP_DRAG_END,
    ON_STEP_REMOVED
} from "./CreateSteps/CreateSteps.actions.view";
import {
    ON_COOKING_TIME_CHANGE,
    ON_DESCRIPTION_CHANGE,
    ON_NAME_CHANGE,
    ON_OVEN_TEMP_CHANGE
} from "./CreateGeneral/CreateGeneral.actions.view";
import {
    ON_RECIPE_SAVE_FAILED,
    ON_RECIPE_SAVE_SUCCESSFUL,
    ON_RECIPE_VALIDATION_FAILED
} from "./Create.actions";
import {
    REMOVE_IMAGE,
    UPLOAD_IMAGE_AWAIT_RESPONSE,
    UPLOAD_IMAGE_FAILED,
    UPLOAD_IMAGE_SUCCESSFUL
} from "./UploadImages/UploadImages.actions";
import {EDIT_RECIPE} from "../recipe/screens/RecipeCard/views/recipe-footer/RecipeFooter.actions.view";
import {CREATE_RECIPE} from "../search/RecipeSearch/RecipeSearch.actions";
import {LOAD_RECIPE_AWAIT_RESPONSE} from "../recipe/Recipe.actions";
import {ON_TAGS_SELECTED} from "./AddTags/AddTags.actions.view";

const initialState = {
    id: "",
    recipeName: "",
    ovenTemperature: undefined,
    cookingTime: undefined,
    description: "",
    ingredients: [],
    images: [], // Array of images uploaded for this recipe, each image is an object with an image id and a url
    steps: [],
    errors: {},
    saveError: "",
    imageUploadError: "",
    uploadingImage: false,
    redirectTo: "",
    unsavedChanges: false,
    allTags: [],
    selectedTags: [],
}

export function create(state = initialState, action) {
    switch (action.type) {
        case ON_INGREDIENT_DRAG_END:
            const result = action.payload.result;
            if (!result.destination) {
                // The drag ended outside of the dropzone.
                return state;
            }

            return newState(state, {
                ingredients: reorderIngredients(state.ingredients, result.source.index, result.destination.index)
            });
        case ON_STEP_DRAG_END:
            const stepResult = action.payload.result;
            if (!stepResult.destination) {
                // The drag ended outside of the dropzone.
                return state;
            }

            return newState(state, {
                steps: reorderSteps(state.steps, stepResult.source.index, stepResult.destination.index)
            })
        case ON_NAME_CHANGE:
            return newState(state, {
                recipeName: action.payload.newName
            })
        case ON_DESCRIPTION_CHANGE:
            return newState(state, {
                description: action.payload.newDescription
            })
        case ON_OVEN_TEMP_CHANGE:
            const ovenTemp = validateInteger(action.payload.newTemp, state.ovenTemperature);
            return newState(state, {
                ovenTemperature: ovenTemp
            })
        case ON_COOKING_TIME_CHANGE:
            const cookingTime = validateInteger(action.payload.newCookingTime, state.cookingTime);
            return newState(state, {
                cookingTime: cookingTime
            })
        case ON_INGREDIENT_CREATED:
            return newIngredient(state);
        case ON_INGREDIENT_UNIT_CHANGE:
            return updateIngredientUnit(state, action.payload.newUnit, action.payload.ingredientId);
        case ON_INGREDIENT_NAME_CHANGE:
            return updateIngredientName(state, action.payload.newName, action.payload.ingredientId);
        case ON_INGREDIENT_AMOUNT_CHANGE:
            return updateIngredientAmount(state, action.payload.newAmount, action.payload.ingredientId);
        case ON_INGREDIENT_REMOVED:
            return removeIngredient(state, action.payload.ingredientId)
        case ON_STEP_CREATED:
            return newStep(state);
        case ON_STEP_DESCRIPTION_CHANGE:
            return updateStepDescription(state, action.payload.newDescription, action.payload.id);
        case ON_STEP_REMOVED:
            return removeStep(state, action.payload.id)
        case ON_RECIPE_VALIDATION_FAILED:
            return newState(state, {
                errors: action.payload.errors
            })
        case ON_RECIPE_SAVE_FAILED:
            return newState(state, {
                saveError: action.payload.message,
                errors: {}
            })
        case ON_RECIPE_SAVE_SUCCESSFUL:
            return newState(state, {
                saveError: "",
                errors: {},
                redirectTo: "/recipes/" + action.payload.recipe
            })
        case UPLOAD_IMAGE_AWAIT_RESPONSE:
            return newState(state, {
                uploadingImage: true
            })
        case UPLOAD_IMAGE_SUCCESSFUL:
            return addImage(state, action.payload)
        case UPLOAD_IMAGE_FAILED:
            return newState(state, {
                imageUploadError: action.payload.message,
                uploadingImage: false
            })
        case EDIT_RECIPE:
            return editRecipe(state, action.payload.recipe)
        case CREATE_RECIPE:
            return initialState
        case REMOVE_IMAGE:
            return removeImage(state, action.payload.image)
        case LOAD_RECIPE_AWAIT_RESPONSE:
            return newState(state, {
                redirectTo: ""
            })
        case ON_TAGS_SELECTED:
            return newState(state, {
                selectedTags: action.payload.tags
            })
        default:
            return state;
    }
}

function validateNumber(newNumber, oldValue) {
    if (newNumber === "") {
        return undefined
    }

    newNumber = newNumber.replaceAll(",", ".")

    if (isNaN(newNumber)) {
        return oldValue;
    }

    if (newNumber.includes("-")) {
        newNumber.replaceAll("-", "")
    }

    return newNumber.toString()
}

function validateInteger(newNumber, oldValue) {
    if (newNumber === "") {
        return undefined
    }

    const parsed = parseInt(newNumber, 10)
    if (isNaN(parsed)) {
        return oldValue
    }

    return Math.abs(parsed).toString()
}

function newState(oldState, change) {
    const defaults = Object.assign({}, oldState, {
        redirectTo: "",
        unsavedChanges: true
    })

    return Object.assign({}, defaults, change);
}

function reorderIngredients(list, startIndex, endIndex) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
}

function reorderSteps(list, startIndex, endIndex) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result.map((step, index) => {
        step.number = index;
        return step;
    });
}

function newIngredient(state) {
    return newState(state, {
        ingredients: [...state.ingredients, {
            id: getNextIngredientId(state),
            name: "",
            unit: "",
            amount: undefined
        }]
    })
}

function newStep(state) {
    return newState(state, {
        steps: [...state.steps, {
            id: getNextStepId(state),
            number: getNextStepNumber(state),
            step: ""
        }]
    })
}

function updateIngredientUnit(state, newUnit, ingredientId) {
    return newState(state, {
                        ingredients: state.ingredients.map(ingredient =>
                                                           ingredient.id === ingredientId ?
                                                           {
                                                               ...ingredient,
                                                               unit: newUnit
                                                           } :
                                                           ingredient
                        )
                    }
    )
}

function updateIngredientName(state, newName, ingredientId) {
    return newState(state, {
                        ingredients: state.ingredients.map(ingredient =>
                                                           ingredient.id === ingredientId ?
                                                           {
                                                               ...ingredient,
                                                               name: newName
                                                           } :
                                                           ingredient
                        )
                    }
    )
}

function updateIngredientAmount(state, newAmount, ingredientId) {
    return newState(state, {
                        ingredients: state.ingredients.map(ingredient => {
                                                               if (ingredient.id === ingredientId) {
                                                                   const amount = validateNumber(newAmount, ingredient.amount)
                                                                   return {
                                                                       ...ingredient,
                                                                       amount: amount
                                                                   }
                                                               }

                                                               return ingredient
                                                           }
                        )
                    }
    )
}

function updateStepDescription(state, newDescription, id) {
    return newState(state, {
        steps: state.steps.map(step => step.id === id ? {
            ...step,
            step: newDescription
        } :
        step
        )
    })
}

function removeIngredient(state, id) {
    return newState(state, {
        ingredients: state.ingredients.filter(ingredient => ingredient.id !== id)
    });
}

function removeStep(state, id) {
    let newSteps = []
    let removed = null;
    state.steps.forEach(step => {
        if (step.id === id) {
            removed = step;
        }
    })

    if (removed === null) {
        return state;
    }

    state.steps.forEach(step => {
        if (step.id !== id) {
            step.number > removed.number ?
            newSteps.push(
            {
                ...step,
                number: step.number - 1
            }) :
            newSteps.push(step);
        }
    })

    return newState(state, {
        steps: newSteps
    })
}

function getNextIngredientId(state) {
    // FIXME: Quick solution, maybe create a better in the future.
    let highest = -1;
    state.ingredients.forEach(ingredient => {
        if (ingredient.id > highest) {
            highest = ingredient.id;
        }
    })
    return highest + 1;
}

function getNextStepId(state) {
    // FIXME: Quick solution, maybe create a better in the future.
    let highest = -1;
    state.steps.forEach(step => {
        if (step.id > highest) {
            highest = step.id
        }
    })
    return highest + 1;
}

function getNextStepNumber(state) {
    // FIXME: Quick solution, maybe create a better in the future.
    let highest = -1;
    state.steps.forEach(step => {
        if (step.number > highest) {
            highest = step.number;
        }
    })
    return highest + 1;
}

function addImage(state, payload) {
    return newState(state, {
        images: [...state.images, {
            id: payload.image_id,
            url: payload.image_url
        }],
        imageUploadError: "",
        uploadingImage: false
    })
}

function editRecipe(state, recipe) {
    const ingredients = recipe.ingredients.map((ingredient, index) => {
        return {
            id: index + 1,
            name: ingredient.name,
            unit: ingredient.unit,
            amount: ingredient.amount
        }
    })

    const steps = recipe.steps.map(step => {
        return {
            id: step.number,
            number: step.number,
            step: step.description
        }
    })

    return newState(initialState, {
        id: recipe.id,
        recipeName: recipe.name,
        description: recipe.description,
        steps: steps,
        ingredients: ingredients,
        cookingTime: recipe.estimatedTime,
        ovenTemperature: recipe.ovenTemperature,
        images: recipe.images,
        redirectTo: "",
        unsavedChanges: false,
        selectedTags: recipe.tags.map(tag => tag.id)
    })
}

function removeImage(state, image) {
    let newImages = []
    state.images.forEach(img => {
        if (img.id !== image.id) {
            newImages.push(img)
        }
    })

    return newState(state, {
        images: newImages
    })
}