import React, {useEffect} from "react"
import {
    AddIconButtonContainer,
    CreateRecipeButton,
    SearchCard,
    SearchCardRow,
    SearchContainer,
    SearchTextField
} from "../Search.styles";
import {NavLink} from "react-router-dom";
import {Fab} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import {SmallVSpace} from "./search-list/RecipeListCard/RecipeListCard.styles.view";
import ErrorCard from "../../../common/views/errorcard";
import SearchListView from "./search-list/SearchList.container.view";
import TagSelect from "../../../common/elements/tag-select/TagSelect.container";

export const RecipeSearch = props => {
    const {loadRecipes} = props

    useEffect(() => {
        loadRecipes()
    }, [loadRecipes])

    return (
    <SearchContainer className="Search container">
        <SearchCard>
            <SearchCardRow>
                <SearchTextField variant="outlined"
                                 label="Sök bland recept"
                                 onChange={val => props.onSearchChanged(val.target.value)}
                                 value={props.searchText}
                                 maxLength={120}
                >
                    Sök efter recept
                </SearchTextField>
                <NavLink to="/recipe/create">
                    {
                        window.innerWidth < 768 ? (
                        <AddIconButtonContainer>
                            <Fab color="secondary"
                                 onClick={props.newRecipe}
                            >
                                <AddIcon/>
                            </Fab>
                        </AddIconButtonContainer>
                        ) : (
                        <CreateRecipeButton variant="contained"
                                            color="primary"
                                            onClick={props.newRecipe}>
                            Lägg till recept
                        </CreateRecipeButton>
                        )
                    }
                </NavLink>
            </SearchCardRow>
            <SearchCardRow>
                <TagSelect selectedTags={props.selectedTags}
                           selectTags={props.selectTags}/>
            </SearchCardRow>
        </SearchCard>
        <SmallVSpace/>
        {props.error && (
        <ErrorCard message={props.error}/>
        )}
        {props.error === null && (
        <SearchListView/>
        )}
    </SearchContainer>
    )
}
