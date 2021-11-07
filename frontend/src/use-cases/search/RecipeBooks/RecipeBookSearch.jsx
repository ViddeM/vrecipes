import React, {useEffect} from "react"
import {
    AddIconButtonContainer,
    CreateRecipeButton,
    SearchCard,
    SearchContainer,
    SearchTextField
} from "../Search.styles";
import {NavLink} from "react-router-dom";
import {Fab} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import {SmallVSpace} from "../RecipeSearch/search-list/RecipeListCard/RecipeListCard.styles.view";
import BookList from "./book-list/BookList.container.view";
import ErrorCard from "../../../common/views/errorcard";

export const RecipeBookSearch = props => {
    const {loadRecipeBooks} = props

    useEffect(() => {
        loadRecipeBooks()
    }, [loadRecipeBooks])

    return (
    <SearchContainer className="search-recipe-book-container">
        <SearchCard>
            <SearchTextField variant="outlined"
                             label="Sök bland receptböcker"
                             maxLength={120}
                             value={props.searchText}
                             onChange={val => props.onBookSearchChanged(val.target.value)}
            >
                Sök efter receptböcker
            </SearchTextField>
            <NavLink to="/book/create">
                {
                    window.screen.width < 768 ? (
                    <AddIconButtonContainer>
                        <Fab color="secondary"
                             onClick={props.newRecipeBook}
                        >
                            <AddIcon/>
                        </Fab>
                    </AddIconButtonContainer>
                    ) : (
                    <CreateRecipeButton variant="contained"
                                        color="primary"
                                        onClick={props.newRecipeBook}
                    >
                        Lägg till receptbok
                    </CreateRecipeButton>
                    )
                }
            </NavLink>
        </SearchCard>
        <SmallVSpace/>
        {props.error && (
        <ErrorCard message={props.error}/>
        )}
        {props.error === null && (
        <BookList/>
        )}
    </SearchContainer>
    )
}