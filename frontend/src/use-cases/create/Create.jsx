import React from "react";
import {CreateContainer, ErrorText, WarningText} from "./Create.styles";
import CreateGeneral from "./CreateGeneral/CreateGeneral.container.view";
import {Redirect, Route} from "react-router";
import CreateIngredients
    from "./CreateIngredients/CreateIngredients.container.view";
import CreateSteps from "./CreateSteps/CreateSteps.container.view";
import UploadImages from "./UploadImages/UploadImages.container";
import Button from "@material-ui/core/Button";
import {VSpace} from "../../common/styles/Common.styles";
import AddTags from "./AddTags/AddTags.container.view";

export const Create = props => {
    const errorsList = Object.keys(props.errors);

    if (props.redirectTo !== "") {
        return (
        <Route>
            <Redirect to={props.redirectTo}/>
        </Route>
        )
    }

    return (
    <CreateContainer>
        <CreateGeneral/>
        <CreateIngredients/>
        <CreateSteps/>
        <AddTags/>
        <UploadImages/>
        {
            errorsList.length > 0 ? (
            <ErrorText>
                Någonting är fel med receptet, var vänlig se över receptet och
                lös problemen.
            </ErrorText>
            ) :
            props.saveError &&
            <ErrorText>
                {props.saveError}
            </ErrorText>
        }
        {
            props.unsavedChanges && (
            <WarningText>
                Du har gjort ändringar som inte har sparats än
            </WarningText>
            )
        }
        <Button variant="contained"
                color="primary"
                onClick={() => props.recipe.id === "" ?
                props.onSave(props.recipe) :
                props.onEditedRecipeSave(props.recipe)
                }
        >
            Spara recept
        </Button>
        <VSpace/>
    </CreateContainer>
    )
}
