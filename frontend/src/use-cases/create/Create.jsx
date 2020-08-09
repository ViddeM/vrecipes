import React from "react";
import {
    DigitButton,
    DigitForm,
    DigitIconButton,
    DigitText,
    DigitTextArea,
    DigitTextField
} from "@cthit/react-digit-components";
import {FormColumn, FormRow, StyledCard} from "./Create.styles";
import {FormRowLine} from "./FormRowLine/FormRowLine";
import CreateIngredient from "./CreateIngredient/CreateIngredient.view";
import {IngredientText} from "../../common/styles/Common.styles";
import {getFormattedIngredient} from "../../common/functions/formatting";
import {CreateStep} from "./CreateStep/CreateStep.view";
import ClearIcon from "@material-ui/icons/Clear";

export const Create = () => (
    <StyledCard>
        <DigitForm initialValues={{}} onSubmit={values => {
            console.log("VALUES", values)
        }} render={() => (
            <FormColumn>
                <FormRow>
                    <DigitTextField outlined maxLength={60} upperLabel="Receptnamn (obligatorisk)" flex={1}
                                    onChange={() => {
                                    }}/>
                </FormRow>
                <FormRow>
                    <DigitTextField outlined maxLength={4} upperLabel="Ungstemperatur" flex={1} onChange={() => {
                    }} margin={{right: "20px"}}/>
                    <DigitTextField outlined maxLength={4} upperLabel="Tillagningstid (min)" flex={1} onChange={() => {
                    }}/>
                </FormRow>
                <FormRow>
                    <DigitTextArea outlined upperLabel="Beskrivning av rätt" flex={1} rows={6}
                                   onChange={() => {
                                   }}/>
                </FormRow>


                <FormRowLine/>
                <FormRow>
                    <DigitText.Title alignCenter text="Ingredienser"/>
                </FormRow>
                <FormRowLine/>
                <FormRow>
                    <IngredientText alignRight text={getFormattedIngredient({amount: 2, unit: "g", name: "smör"})}/>
                    <DigitIconButton icon={ClearIcon} alignSelf="center" padding={"6px"} secondary onClick={() => {
                        alert("Är du säker på att du vill ta bort denna ingrediens?");
                    }}/>
                </FormRow>
                <FormRowLine/>
                <CreateIngredient/>
                <FormRow>
                    <DigitButton onClick={() => {
                    }} alignSelf="center" raised primary text="Lägg till ingrediens" margin={{top: "10px"}}/>
                </FormRow>
                <FormRowLine/>


                <FormRow>
                    <DigitText.Title alignCenter text="Tillagningssteg"/>
                </FormRow>
                <FormRowLine/>
                <FormRow>
                    <DigitText.Text/>
                </FormRow>
                <FormRowLine/>
                <CreateStep/>
                <FormRow>
                    <DigitButton onClick={() => {
                    }} alignSelf="center" raised primary text="Lägg till steg" margin={{top: "10px"}}/>
                </FormRow>
                <FormRowLine/>
            </FormColumn>
        )}
        />
    </StyledCard>
)