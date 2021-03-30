import React, {useState} from "react";
import {AddIngredientButton, Dropzone, FormColumn, FormRow, StyledCard} from "../Create.styles";
import {DragDropContext, Droppable} from "react-beautiful-dnd";
import {DisplayStep} from "./DisplayStep/DisplayStep.view";
import {StyledText} from "../../../common/styles/Common.styles";
import {Button, Typography} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";

export const CreateSteps = props => {

    const [toRemove, setToRemove] = useState(null)

    return (
        <StyledCard>
            <FormColumn>
                <FormRow>
                    <StyledText variant="h6">
                        Tillagningssteg
                    </StyledText>
                </FormRow>
                <DragDropContext onDragEnd={props.onDragEnd}>
                    <Droppable droppableId={"steps"}>
                        {(provided, snapshot) => (
                            <Dropzone
                                {...provided.droppableProps}
                                ref={provided.innerRef}>
                                <Typography>
                                    {props.steps.length > 0 ?
                                        "Dra runt steg här för att ändra ordning på dem!" :
                                        "Lägg till några steg!"
                                    }
                                </Typography>
                                {props.steps.map((step, index) => (
                                    <DisplayStep key={step.id} props={{
                                        step: step,
                                        index: index,
                                        onStepDescriptionChange: props.onStepDescriptionChange,
                                        onStepRemove: () => {
                                            setToRemove(step.id)
                                        },
                                        errors: getErrors(props.errors, step.id)
                                    }}/>
                                ))}
                                {provided.placeholder}
                            </Dropzone>
                        )}
                    </Droppable>
                </DragDropContext>
                {getDialog(toRemove !== null,
                    () => props.onStepRemove(toRemove),
                    () => setToRemove(null)
                )}
                <FormRow>
                    <AddIngredientButton onClick={props.onStepCreate}
                                         variant="contained"
                                         color="primary"
                    >
                        Lägg till steg
                    </AddIngredientButton>
                </FormRow>
            </FormColumn>
        </StyledCard>
    )
}

function getDialog(open, onRemove, closeDialog) {
    return (
        <Dialog
            open={open}
            onClose={closeDialog}
            aria-labelledby="alert-delete-step-title"
            aria-describedby="alert-delete-step-description"
        >
            <DialogTitle id="alert-delete-step-title">
                {"Ta bort steg?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-delete-step-description">
                    Är du säkert på att du vill ta bort detta steg?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color="secondary"
                        variant="contained"
                        onClick={closeDialog}
                >
                    Nej
                </Button>
                <Button color="primary"
                        variant="contained"
                        onClick={() => {
                            onRemove()
                            closeDialog()
                        }}
                >
                    Ja
                </Button>
            </DialogActions>
        </Dialog>
    )
}

function getErrors(errors, id) {
    return errors && errors[id] ?
        errors[id] : {}
}