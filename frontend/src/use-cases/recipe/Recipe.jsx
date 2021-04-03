import React, {useEffect} from "react";
import {BackButton, ErrorContainer, LoadingContainer, RecipeContainer, RecipeDisplayContainer} from "./Recipe.styles";
import {Redirect, Route} from "react-router";
import ErrorCard from "../../common/views/errorcard";
import RecipeCard from "./screens/RecipeCard/RecipeCard.container.screen";
import CircularProgress from "@material-ui/core/CircularProgress";
import {Typography} from "@material-ui/core";


const Recipe = props => {
    const {match: {params}} = props;
    const {loadRecipe} = props;
    useEffect(
        () => {
            loadRecipe(params.recipeId)
        }, [params.recipeId, loadRecipe]
    )

    if (props.redirectTo !== "") {
        props.resetRecipe()
        return (
            <Route>
                <Redirect to={props.redirectTo}/>
            </Route>
        )
    }

    return (
        <RecipeContainer>
            {props.error ? (
                <ErrorContainer>
                    <ErrorCard message={props.error.message}/>
                    <BackButton variant="contained"
                                color="primary"
                                onClick={props.backToSearch}
                    >
                        Tillbaka till startsidan
                    </BackButton>
                </ErrorContainer>
            ) : (
                <RecipeDisplayContainer>
                    {props.recipe ? (
                        <RecipeCard/>
                    ) : (
                        <LoadingContainer>
                            <CircularProgress/>
                            <Typography variant="h6">
                                Laddar recept...
                            </Typography>
                        </LoadingContainer>
                    )}
                </RecipeDisplayContainer>
            )}
        </RecipeContainer>
    )
}


export default Recipe;