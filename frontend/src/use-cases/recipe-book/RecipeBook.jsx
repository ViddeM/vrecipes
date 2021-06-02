import React, {useEffect} from "react"
import {RecipeBookContainer} from "./RecipeBook.styles";
import RecipeBookCard from "./RecipeBookCard/RecipeBookCard.container";
import {
    BackButton,
    ErrorContainer,
    LoadingContainer,
    RecipeDisplayContainer
} from "../recipe/Recipe.styles";
import {CircularProgress, Typography} from "@material-ui/core";
import ErrorCard from "../../common/views/errorcard";
import {Redirect, Route} from "react-router";

export const RecipeBook = props => {
    const {match: {params}} = props;
    const {loadRecipeBook} = props;
    useEffect(
    () => {
        loadRecipeBook(params.bookId)
    }, [params.bookId, loadRecipeBook]
    )

    if (props.redirectTo !== "") {
        props.resetRecipeBook()
        return (
            <Route>
                <Redirect to={props.redirectTo}/>
            </Route>
        )
    }

    return (
    <RecipeBookContainer>
        {props.error ? (
            <ErrorContainer>
                <ErrorCard message={props.error.message}/>
                <BackButton variant="contained"
                            color="primary"
                            onClick={props.backToBookSearch}
                            >
                    Tillbaka till startsidan
                </BackButton>
            </ErrorContainer>
        ) : (
        <RecipeDisplayContainer>
            {props.recipeBook ? (
            <RecipeBookCard />
            ) : (
            <LoadingContainer>
                <CircularProgress/>
                <Typography variant="h6">
                    Laddar receptbok...
                </Typography>
            </LoadingContainer>
            )}
        </RecipeDisplayContainer>
        )}
    </RecipeBookContainer>
    )
}