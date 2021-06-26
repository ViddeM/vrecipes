import React, {useState} from "react";
import {
    BottomRow,
    RecipeBookAuthorsContainer,
    RecipeBookCardContainer,
    RecipeBookCardContentContainer,
    RecipeBookCardImage,
    RecipeBookHLine,
    RecipeBookRecipeData,
    RecipeBookRecipeRow,
    RecipeBookRecipesTable,
    RecipeLink
} from "./RecipeBookCard.styles";
import {Center, StyledText} from "../../../common/styles/Common.styles";
import {TopRow} from "../../recipe/screens/RecipeCard/RecipeCard.styles.screen";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import {Typography} from "@material-ui/core";
import {useHistory} from "react-router";
import Button from "@material-ui/core/Button";
import {getImageUrl} from "../../../api/get.Image.api";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";

export const RecipeBookCard = props => {
    const [deleteDialogOpen, setDialogOpen] = useState(false);

    let history = useHistory()
    let imageUrl = null
    if (props.book.image) {
        imageUrl = getImageUrl(props.book.image.url)
    }

    if (imageUrl == null) {
        imageUrl = "/static/images/default_book_2.png";
    }

    return (
    <RecipeBookCardContainer>
        <TopRow>
            <IconButton onClick={() => history.goBack()}>
                <ArrowBackIcon/>
            </IconButton>
        </TopRow>
        <RecipeBookCardContentContainer>
            <Center>
                <Typography variant="h4">
                    {props.book.name}
                </Typography>
            </Center>
            <RecipeBookHLine/>
            <RecipeBookAuthorsContainer>
                <StyledText variant="subtitle1">
                    {"Författare: " + props.book.author}
                </StyledText>
                <StyledText variant="subtitle1">
                    {"Upplagd av " + props.book.uploadedBy.name}
                </StyledText>
            </RecipeBookAuthorsContainer>
            <RecipeBookHLine/>
            <Center>
                <RecipeBookCardImage
                src={imageUrl}
                alt="Kunde inte visa bild"
                />
            </Center>
            <RecipeBookRecipesTable>
                <thead>
                <RecipeBookRecipeRow>
                    <th>
                        <StyledText variant="h6" align="left">
                            Receptnamn
                        </StyledText>
                    </th>
                    <th>
                        <StyledText variant="h6" align="right">
                            Upplagd av
                        </StyledText>
                    </th>
                </RecipeBookRecipeRow>
                </thead>
                <tbody>
                {props.book.recipes.map(r => (
                <RecipeBookRecipeRow>
                    <RecipeBookRecipeData>
                        <RecipeLink href={"/recipes/" + r.uniqueName}>
                            <StyledText variant="subtitle1">
                                {r.name}
                            </StyledText>
                        </RecipeLink>
                    </RecipeBookRecipeData>
                    <RecipeBookRecipeData>
                        <StyledText variant="subtitle1" align="right">
                            {r.author}
                        </StyledText>
                    </RecipeBookRecipeData>
                </RecipeBookRecipeRow>
                ))}
                </tbody>
            </RecipeBookRecipesTable>
            <BottomRow>
                <Button variant="contained"
                        color="secondary"
                        onClick={() => {
                            setDialogOpen(true)
                        }}
                        disabled={!props.loggedInUser || props.loggedInUser.id !== props.book.uploadedBy.id}
                >
                    Ta bort
                </Button>
                {getDialog(
                deleteDialogOpen,
                () => props.deleteRecipeBook(props.book.id),
                () => setDialogOpen(false)
                )}
                <Button variant="contained"
                        color="primary"
                        onClick={() => {
                            props.editRecipeBook(props.book)
                        }}
                        disabled={!props.loggedInUser || props.loggedInUser.id !== props.book.uploadedBy.id}
                >
                    Redigera
                </Button>
            </BottomRow>
        </RecipeBookCardContentContainer>
    </RecipeBookCardContainer>
    );
}

function getDialog(open, onRemove, closeDialog) {
    return (
    <Dialog
    open={open}
    onClose={closeDialog}
    aria-labelledby="alert-delete-recipe-book-title"
    aria-describedby="alert-delete-recipe-book-description"
    >
        <DialogTitle id="alert-delete-recipe-book-title">
            {"Ta bort receptbok?"}
        </DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-delete-recipe-book-description">
                Är du säkert på att du vill ta bort denna receptbok?
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
