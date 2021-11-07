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
import TagSelect from "../../../common/elements/tag-select/TagSelect";
import {useLocation} from "react-router";
import {tagNameToUnique} from "../../../common/functions/tagNameToUnique";

export const RecipeSearch = props => {
    const {loadRecipes} = props
    useEffect(() => {
        loadRecipes()
    }, [loadRecipes])

    const {loadTags, allTags, selectedTags, selectTags} = props
    useEffect(() => {
        loadTags()
    }, [loadTags])

    const search = useLocation().search;
    useEffect(() => {
        const tagsStr = new URLSearchParams(search).get("tags")
        if (tagsStr !== null) {
            const tags = tagsStr.split(",").map(tagStr => {
                for (let i = 0; i < allTags.length; i++) {
                    if (tagNameToUnique(allTags[i].name) === tagStr) {
                        return allTags[i]
                    }
                }
                return null;
            }).filter(val => val !== null)
            selectTags(tags)
        }
    }, [search, allTags])

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
            </SearchCardRow>
            <SearchCardRow>
                <TagSelect selectedTags={selectedTags}
                           selectTags={selectTags}
                           allTags={allTags}
                />
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
