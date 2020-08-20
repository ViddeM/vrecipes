import React from "react";
import {Dropzone, FormColumn, FormRow, StyledCard} from "../Create.styles";
import {DigitButton, DigitText} from "@cthit/react-digit-components";
import {DragDropContext, Droppable} from "react-beautiful-dnd";
import {DisplayStep} from "./DisplayStep/DisplayStep.view";

export const CreateSteps = props => (
    <StyledCard>
        <FormColumn>
            <FormRow>
                <DigitText.Title alignCenter text="Tillagningssteg"/>
            </FormRow>
            <DragDropContext onDragEnd={props.onDragEnd}>
                <Droppable droppableId={"steps"}>
                    {(provided, snapshot) => (
                        <Dropzone
                            {...provided.droppableProps}
                            ref={provided.innerRef}>
                            <DigitText.Text text="Dra runt steg här för att ändra ordning på dem!"/>
                            {props.steps.map((step, index) => (
                                <DisplayStep key={step.id} props={{step: step, index: index}}/>
                            ))}
                            {provided.placeholder}
                        </Dropzone>
                    )}
                </Droppable>
            </DragDropContext>
            <FormRow>
                <DigitButton onClick={() => {
                }} alignSelf="center" raised primary text="Lägg till steg" margin={{top: "10px"}}/>
            </FormRow>
        </FormColumn>
    </StyledCard>
)