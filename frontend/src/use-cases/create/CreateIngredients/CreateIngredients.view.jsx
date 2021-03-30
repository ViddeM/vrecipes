import React, {useState} from "react";
import {AddIngredientButton, Dropzone, FormColumn, FormRow, StyledCard} from "../Create.styles";
import {DragDropContext, Droppable} from "react-beautiful-dnd";
import {DisplayIngredient} from "./DisplayIngredient/DisplayIngredient.view";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import {Button} from "@material-ui/core";
import {StyledText} from "../../../common/styles/Common.styles";
import Typography from "@material-ui/core/Typography";

export const CreateIngredients = props => {

    const [toRemove, setToRemove] = useState(null)

    return (
        <StyledCard>
            <FormColumn>
                <FormRow>
                    <StyledText variant="h6">
                        Ingredienser
                    </StyledText>
                </FormRow>
                <DragDropContext onDragEnd={props.onDragEnd}>
                    <Droppable droppableId={"ingredients"}>
                        {(provided, snapshot) => (
                            <Dropzone
                                {...provided.droppableProps}
                                ref={provided.innerRef}>
                                <Typography>
                                    {props.ingredients.length === 0 ?
                                        "Lägg till några ingredienser!" :
                                        "Dra runt ingredienser här för att ändra ordning på dem!"}
                                </Typography>
                                {props.ingredients.map((ingredient, index) => (
                                    <DisplayIngredient
                                        key={ingredient.id}
                                        props={{
                                            ingredient: ingredient,
                                            index: index,
                                            onIngredientUnitChange: (unit, id) => props.onIngredientUnitChange(unit, id),
                                            onIngredientNameChange: (name, id) => props.onIngredientNameChange(name, id),
                                            onIngredientAmountChange: (amount, id) => props.onIngredientAmountChange(amount, id),
                                            onIngredientRemove: () => {
                                                setToRemove(ingredient.id)
                                            },
                                            errors: getErrors(props.errors, ingredient.id)
                                        }}
                                    />
                                ))}
                                {provided.placeholder}
                            </Dropzone>
                        )}
                    </Droppable>
                </DragDropContext>
                {getDialog(toRemove !== null,
                    () => props.onIngredientRemoved(toRemove),
                    () => setToRemove(null)
                )}
                <FormRow>
                    <AddIngredientButton onClick={props.onIngredientCreate}
                                         variant="contained"
                                         color="primary">
                        Lägg till ingrediens
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
            aria-labelledby="alert-delete-ingredient-title"
            aria-describedby="alert-delete-ingredient-description"
        >
            <DialogTitle id="alert-delete-ingredient-title">
                {"Ta bort ingrediens?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-delete-ingredient-description">
                    Är du säkert på att du vill ta bort denna ingrediens?
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
        errors[id] :
        {}
}