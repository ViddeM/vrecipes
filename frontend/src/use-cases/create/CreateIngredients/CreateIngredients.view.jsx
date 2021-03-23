import React from "react";
import {Dropzone, FormColumn, FormRow, StyledCard} from "../Create.styles";
import {DigitButton, DigitText, useDigitCustomDialog} from "@cthit/react-digit-components";
import {DragDropContext, Droppable} from "react-beautiful-dnd";
import {DisplayIngredient} from "./DisplayIngredient/DisplayIngredient.view";
import {ButtonContainer} from "./CreateIngredients.styles.view";
import {SmallHSpace} from "../../../common/styles/Common.styles";

export const CreateIngredients = props => {
    const [openDialog] = useDigitCustomDialog({
        title: "Bekräfta"
    });

    return (
        <StyledCard>
            <FormColumn>
                <FormRow>
                    <DigitText.Title alignCenter text="Ingredienser"/>
                </FormRow>
                <DragDropContext onDragEnd={props.onDragEnd}>
                    <Droppable droppableId={"ingredients"}>
                        {(provided, snapshot) => (
                            <Dropzone
                                {...provided.droppableProps}
                                ref={provided.innerRef}>
                                <DigitText.Text
                                    text={props.ingredients.length === 0 ?
                                        "Lägg till några ingredienser!" :
                                        "Dra runt ingredienser här för att ändra ordning på dem!"}/>
                                {props.ingredients.map((ingredient, index) => (
                                    <DisplayIngredient key={ingredient.id}
                                                       props={{
                                                           ingredient: ingredient,
                                                           index: index,
                                                           onIngredientUnitChange: (unit, id) => props.onIngredientUnitChange(unit, id),
                                                           onIngredientNameChange: (name, id) => props.onIngredientNameChange(name, id),
                                                           onIngredientAmountChange: (amount, id) => props.onIngredientAmountChange(amount, id),
                                                           onIngredientRemove: () => {
                                                               openDialog(getDialog(ingredient.id, props.onIngredientRemoved))
                                                           },
                                                           errors: getErrors(props.errors, ingredient.id)
                                                       }}/>
                                ))}
                                {provided.placeholder}
                            </Dropzone>
                        )}
                    </Droppable>
                </DragDropContext>
                <FormRow>
                    <DigitButton onClick={props.onIngredientCreate}
                                 alignSelf="center" raised primary
                                 text="Lägg till ingrediens"
                                 margin={{top: "10px"}}/>
                </FormRow>
            </FormColumn>
        </StyledCard>
    )
}

function getDialog(ingredientId, onIngredientRemoved) {
    return {
        renderMain: () => (
            <DigitText.Text
                text={"Är du säker på att du vill ta bort denna ingrediens?"}/>),
        renderButtons: (confirm, cancel) => (
            <ButtonContainer>
                <DigitButton
                    raised
                    secondary
                    text={"Nej"}
                    onClick={cancel}
                    flex={"1"}
                />`
                <SmallHSpace/>
                <DigitButton
                    raised
                    primary
                    text={"Ja"}
                    onClick={confirm}
                    flex={"1"}/>
            </ButtonContainer>
        ),
        onConfirm: () => {
            onIngredientRemoved(ingredientId);
        }
    }
}

function getErrors(errors, id) {
    return errors && errors[id] ?
        errors[id] :
        {}
}