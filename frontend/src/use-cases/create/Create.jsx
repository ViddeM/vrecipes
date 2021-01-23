import React from "react";
import {DigitButton, DigitText} from "@cthit/react-digit-components";
import {CreateContainer} from "./Create.styles";
import CreateGeneral from "./CreateGeneral/CreateGeneral.container.view";
import CreateIngredients from "./CreateIngredients/CreateIngredients.container.view";
import CreateSteps from "./CreateSteps/CreateSteps.container.view";
import {VSpace} from "../../common/styles/Common.styles";
import {Redirect, Route} from "react-router";
import UploadImages from "./UploadImages/UploadImages.container";

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
            <UploadImages/>
            {
                errorsList.length > 0 ?
                    <DigitText.Text error
                                    text={"Någonting är fel med receptet, var vänlig se över receptet och lös problemen."}
                                    style={{color: "red"}}/> :
                    props.saveError &&
                    <DigitText.Text error
                                    text={props.saveError}
                                    style={{color: "red"}}/>
            }
            <DigitButton raised primary text={"Spara recept"}
                         onClick={() => props.recipe.id === "" ?
                             props.onSave(props.recipe) :
                             props.onEditedRecipeSave(props.recipe)
                         }/>
            <VSpace/>
        </CreateContainer>
    )
}
