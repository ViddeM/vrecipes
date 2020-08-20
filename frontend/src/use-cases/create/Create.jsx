import React from "react";
import {DigitForm} from "@cthit/react-digit-components";
import {CreateContainer} from "./Create.styles";
import CreateGeneral from "./CreateGeneral/CreateGeneral.container.view";
import CreateIngredients from "./CreateIngredients/CreateIngredients.container.view";
import CreateSteps from "./CreateSteps/CreateSteps.container.view";
import * as yup from "yup"

export const Create = () => (
    <DigitForm initialValues={{}} onSubmit={values => {
        console.log("VALUES", values)
    }} validationSchema={yup.object().shape({})} render={() => (
        <CreateContainer>
            <CreateGeneral/>
            <CreateIngredients/>
            <CreateSteps/>
        </CreateContainer>
    )}
    />
)

