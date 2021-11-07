import React from "react"
import {BodyContainer, ModeSelectContainer} from "./Search.styles";
import {useHistory, useLocation} from "react-router";
import RecipeSearch from "./RecipeSearch/RecipeSearch.container";
import RecipeBook from "./RecipeBooks/RecipeBookSearch.container";
import {ButtonGroup} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import RecipeTags from "./RecipeTags/RecipeTags.container";

const MODE_RECIPE = "mode_recipe"
const MODE_RECIPE_BOOK = "mode_recipe_book"
const MODE_TAGS = "mode_tags"

const Search = () => {
    let location = useLocation()
    let history = useHistory()
    const mode = location.pathname.startsWith("/books")
    ? MODE_RECIPE_BOOK
    : location.pathname.startsWith("/tags")
    ? MODE_TAGS
    : MODE_RECIPE

    return (
    <BodyContainer>
        <ModeSelectContainer>
            <ButtonGroup variant="contained" color="primary"
                         orientation={window.innerWidth < 768 ? "vertical" : "horizontal"}>
                <Button disabled={mode === MODE_RECIPE} onClick={() => {
                    history.push("/")
                }}>
                    Recept
                </Button>
                <Button disabled={mode === MODE_RECIPE_BOOK} onClick={() => {
                    history.push("/books")
                }}>
                    Receptböcker
                </Button>
                <Button disabled={mode === MODE_TAGS} onClick={() => {
                    history.push("/tags")
                }}>
                    Recepttaggar
                </Button>
            </ButtonGroup>
        </ModeSelectContainer>
        {selectView(mode)}
    </BodyContainer>
    );
}

function selectView(mode) {
    switch (mode) {
        case MODE_RECIPE:
            return <RecipeSearch/>
        case MODE_RECIPE_BOOK:
            return <RecipeBook/>
        case MODE_TAGS:
            return <RecipeTags/>
        default:
            return <RecipeSearch/>
    }
}

export default Search;