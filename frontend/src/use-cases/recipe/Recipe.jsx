import React, {useEffect} from "react";
import {LoadingContainer, RecipeContainer} from "./Recipe.styles";
import ErrorCard from "../../common/views/errorcard";
import {DigitButton, DigitLoading, DigitText} from "@cthit/react-digit-components";
import RecipeCard from "./screens/RecipeCard";
import {Redirect, Route} from "react-router";


const Recipe = props => {
    const {match: {params}} = props;
    useEffect(
        () => {
            props.loadRecipe(params.recipeId)
        }, [params.recipeId]
    )

    if (props.redirectTo !== "") {
        return (
            <Route>
                <Redirect to={props.redirectTo}/>
            </Route>
        )
    }

    return (
        <RecipeContainer>
            {props.error ? (
                <div>
                    <ErrorCard message={props.error.message}/>
                    <DigitButton raised primary text={"Tillbaka till startsidan"} size={{height: "40px"}}
                                 margin={{top: "10px"}}
                                 onClick={props.backToSearch}
                    />
                </div>
            ) : (
                <div style={{width: "100%"}}>
                    {props.recipe ? (
                        <RecipeCard/>
                    ) : (
                        <LoadingContainer>
                            <DigitLoading loading={true} size={60} margin={{top: "50px", bottom: "20px"}}/>
                            <DigitText.Heading6 style={{}} text={"Laddar recept..."}/>
                        </LoadingContainer>
                    )}
                </div>
            )}
        </RecipeContainer>
    )
}


export default Recipe;