import {
    NewTagButton,
    TableHeader,
    TableRow,
    TagsActionButton,
    TagsPageTable,
    TagsPageToolbar,
    TagsTable,
    TagsTableElement,
    TagsTableText,
    TagsTextField
} from "./RecipeTags.styles";
import {Button, Link, Typography} from "@material-ui/core";
import {Tag} from "../../../common/elements/Tag/Tag";
import {useTheme} from "@material-ui/core/styles";
import CreateTag from "./create-tag/CreateTag.container";
import React, {useEffect, useState} from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";

export const RecipeTags = props => {
    const {loadTags} = props

    useEffect(() => {
        loadTags()
    }, [loadTags, props.update])

    return (
    <TagsPageTable>
        <TagsPageToolbar>
            <TagsTextField variant="outlined"
                           label={"Sök efter recept tagg"}
                           value={props.searchText}
                           onChange={e => props.onSearch(e.target.value)}

            />
            <NewTagButton color="primary" variant="contained"
                          onClick={() => {
                              props.setCreatingTag(true);
                          }}>
                Ny tagg
            </NewTagButton>
        </TagsPageToolbar>
        {props.creatingTag && (
        <CreateTag setCreatingTag={props.setCreatingTag}/>
        )}
        <TagsTable>
            <TableHeader>
                <Typography>
                    {props.tags.length + " taggar"}
                </Typography>
            </TableHeader>
            {props.tags.map(tag => (
            <TagRow tag={tag} loggedInUser={props.loggedInUser} key={tag.name}
                    deleteTag={props.deleteTag}/>
            ))}
        </TagsTable>
    </TagsPageTable>
    )
}

export default RecipeTags;

const TagRow = props => {
    const [deleteDialogOpen, setDialogOpen] = useState(false);

    const {id, color, description, name, recipeCount, author} = props.tag;
    const theme = useTheme();
    const minimal = window.screen.width <= 880;

    return (
    <TableRow>
        <TagsTableElement width={minimal ? "50%" : "20%"}>
            <Tag color={color} text={name} url={"https://google.com"}/>
        < /TagsTableElement>
        {minimal === false && (
        <>
            <TagsTableElement width="35%" buffer={"16px"}>
                <TagsTableText>
                    {description}
                </TagsTableText>
            </TagsTableElement>
            <TagsTableElement width="10%" buffer={"16px"}>
                {recipeCount > 0 && (
                <TagsTableText display={"block"}>
                    <Link href={"/"}>
                        {recipeCount + " recept"}
                    </Link>
                </TagsTableText>
                )}
            </TagsTableElement>
            <TagsTableElement width="20%" buffer={"16px"}>
                <TagsTableText>
                    {author.name}
                </TagsTableText>
            </TagsTableElement>
        </>
        )}
        <TagsTableElement width={minimal ? "50%" : "15%"} align={"right"}>
            <TagsActionButton theme={theme}
                              disabled={!props.loggedInUser || props.loggedInUser.id !== author.id}>
                Ändra
            </TagsActionButton>
            <TagsActionButton theme={theme}
                              disabled={!props.loggedInUser || props.loggedInUser.id !== author.id}
                              onClick={() => setDialogOpen(true)}>
                Ta bort
            </TagsActionButton>
            {
                getDialog(deleteDialogOpen, () => props.deleteTag(id), () => setDialogOpen(false))
            }
        </TagsTableElement>
    </TableRow>)
}


function getDialog(open, onRemove, closeDialog) {
    return (
    <Dialog
    open={open}
    onClose={closeDialog}
    aria-labelledby="alert-delete-tag-title"
    aria-describedby="alert-delete-tag-description"
    >
        <DialogTitle id="alert-delete-tag-title">
            {"Ta bort tagg?"}
        </DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-delete-tag-description">
                Är du säkert på att du vill ta bort denna tagg?
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
