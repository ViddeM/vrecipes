import React from "react"
import {
    BodyContainer,
    ModeLeftButton,
    ModeRightButton,
    ModeSelectButtonGroup,
    ModeSelectContainer
} from "./Search.styles";
import {useHistory, useLocation} from "react-router";
import RecipeSearch from "./RecipeSearch/RecipeSearch.container";
import RecipeBook from "./RecipeBooks/RecipeBookSearch.container";

const MODE_RECIPE = "mode_recipe"
const MODE_RECIPE_BOOK = "mode_recipe_book"

const Search = () => {
    let location = useLocation()
    let history = useHistory()
    const mode = location.pathname.startsWith("/books") ? MODE_RECIPE_BOOK : MODE_RECIPE

    return (
    <BodyContainer>
        <ModeSelectContainer>
            <ModeSelectButtonGroup>
                <ModeLeftButton variant="contained"
                                color="primary"
                                disabled={mode === MODE_RECIPE}
                                onClick={() => {
                                    history.push("/")
                                }}
                >
                    Recept
                </ModeLeftButton>
                <ModeRightButton variant="contained"
                                 color="primary"
                                 disabled={mode === MODE_RECIPE_BOOK}
                                 onClick={() => {
                                     history.push("/books")
                                 }}
                >
                    Receptböcker
                </ModeRightButton>
            </ModeSelectButtonGroup>
        </ModeSelectContainer>
        { selectView(mode) }
    </BodyContainer>
    );
}

function selectView(mode) {
    switch(mode) {
        case MODE_RECIPE:
            return <RecipeSearch />
        case MODE_RECIPE_BOOK:
            return <RecipeBook />
        default:
            return <RecipeSearch />
    }
}

export default Search;