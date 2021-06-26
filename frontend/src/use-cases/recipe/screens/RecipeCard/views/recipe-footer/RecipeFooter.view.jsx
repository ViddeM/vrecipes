import React, {useState} from "react"
import {
    RecipeFooterColumns,
    RecipeFooterContainer
} from "./RecipeFooter.styles.view";
import {WideHLine} from "../../../../../../common/styles/Common.styles";
import {Button} from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";

const RecipeFooter = props => {
    const [deleteDialogOpen, setDialogOpen] = useState(false);

    return (
    <RecipeFooterColumns>
        <WideHLine/>
        <RecipeFooterContainer>
            <Button color="secondary"
                    variant="contained"
                    onClick={() => {
                        setDialogOpen(true)
                    }}
                    disabled={!props.loggedInUser || props.loggedInUser.id !== props.recipe.author.id}
            >
                Ta bort
            </Button>
            {getDialog(
            deleteDialogOpen,
            () => props.deleteRecipe(props.recipe.id),
            () => setDialogOpen(false)
            )}
            <Button color="primary"
                    variant="contained"
                    onClick={() => {
                        props.editRecipe(props.recipe)
                    }}
                    disabled={!props.loggedInUser || props.loggedInUser.id !== props.recipe.author.id}
            >
                Redigera
            </Button>
        </RecipeFooterContainer>
    </RecipeFooterColumns>
    )
};

function getDialog(open, onRemove, closeDialog) {
    return (
    <Dialog
    open={open}
    onClose={closeDialog}
    aria-labelledby="alert-delete-recipe-title"
    aria-describedby="alert-delete-recipe-description"
    >
        <DialogTitle id="alert-delete-recipe-title">
            {"Ta bort recept?"}
        </DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-delete-recipe-description">
                Är du säkert på att du vill ta bort detta recept?
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
                    onClick={onRemove}
            >
                Ja
            </Button>
        </DialogActions>
    </Dialog>
    )
}


export default RecipeFooter;