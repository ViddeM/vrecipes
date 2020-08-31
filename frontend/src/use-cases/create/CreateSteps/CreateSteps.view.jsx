import React from "react";
import {Dropzone, FormColumn, FormRow, StyledCard} from "../Create.styles";
import {
    DigitButton,
    DigitText,
    useDigitCustomDialog
} from "@cthit/react-digit-components";
import {DragDropContext, Droppable} from "react-beautiful-dnd";
import {DisplayStep} from "./DisplayStep/DisplayStep.view";
import {ButtonContainer} from "../CreateIngredients/CreateIngredients.styles.view";
import {SmallHSpace} from "../../../common/styles/Common.styles";

export const CreateSteps = props => {
    const [openDialog] = useDigitCustomDialog({
                                                  title: "Bekräfta"
                                              });
    return (
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
                                <DigitText.Text
                                    text={props.steps.length > 0 ?
                                        "Dra runt steg här för att ändra ordning på dem!" :
                                        "Lägg till några steg!"
                                    }/>
                                {props.steps.map((step, index) => (
                                    <DisplayStep key={step.id} props={{
                                        step: step,
                                        index: index,
                                        onStepDescriptionChange: props.onStepDescriptionChange,
                                        onStepRemove: () => {
                                            openDialog(getDialog(step.id, props.onStepRemove))
                                        },
                                        errors: getErrors(props.errors, step.id)
                                    }}/>
                                ))}
                                {provided.placeholder}
                            </Dropzone>
                        )}
                    </Droppable>
                </DragDropContext>
                <FormRow>
                    <DigitButton onClick={props.onStepCreate}
                                 alignSelf="center" raised primary
                                 text="Lägg till steg" margin={{top: "10px"}}/>
                </FormRow>
            </FormColumn>
        </StyledCard>
    )
}

function getDialog(id, onRemove) {
    return {
        renderMain: () => (
            <DigitText.Text
                text={"Är du säker på att du vill ta bort detta steg?"}/>
        ),
        renderButtons: (confirm, cancel) => (
            <ButtonContainer>
                <DigitButton
                    raised
                    primary
                    text={"JA"}
                    onClick={confirm}
                    flex={"1"}
                />
                <SmallHSpace/>
                <DigitButton
                    raised
                    secondary
                    text={"NEJ"}
                    onClick={cancel}
                    flex={"1"}
                />
            </ButtonContainer>
        ),
        onConfirm: () => {
            onRemove(id);
        }
    }
}

function getErrors(errors, id) {
    return errors && errors[id] ?
        errors[id] : {}
}