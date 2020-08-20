import React from "react";
import {Dropzone, FormColumn, FormRow, StyledCard} from "../Create.styles";
import {DigitButton, DigitText} from "@cthit/react-digit-components";
import {DragDropContext, Droppable} from "react-beautiful-dnd";
import {DisplayIngredient} from "./DisplayIngredient/DisplayIngredient.view";

export const CreateIngredients = props => (
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
                            <DigitText.Text text="Dra runt ingredienser här för att ändra ordning på dem!"/>
                            {props.ingredients.map((ingredient, index) => (
                                <DisplayIngredient key={ingredient.id}
                                                   props={{ingredient: ingredient, index: index}}/>
                            ))}
                            {provided.placeholder}
                        </Dropzone>
                    )}
                </Droppable>
            </DragDropContext>
            {/*<CreateIngredient/>*/}
            <FormRow>
                <DigitButton onClick={() => {
                }} alignSelf="center" raised primary text="Lägg till ingrediens" margin={{top: "10px"}}/>
            </FormRow>
        </FormColumn>
    </StyledCard>
)