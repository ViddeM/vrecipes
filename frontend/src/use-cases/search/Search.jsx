import React, {useEffect} from "react"
import {
    AddIconButtonContainer,
    BodyContainer,
    CreateRecipeButton,
    SearchAddContainer,
    SearchContainer,
    SearchTextField
} from "./Search.styles";
import {SmallVSpace} from "./search-list/RecipeListCard/RecipeListCard.styles.view";
import ErrorCard from "../../common/views/errorcard";
import {NavLink} from "react-router-dom";
import {Fab} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import SearchListView from "./search-list/SearchList.container.view";

const Search = props => {
    useEffect(() => {
        props.loadRecipes()
    }, [])

    return (
        <BodyContainer>
            <SearchContainer className="Search container">
                <SearchAddContainer>
                    <SearchTextField variant="outlined"
                                     label="Sök bland recept"
                                     onChange={val => props.onSearchChanged(val.target.value)}
                                     value={props.searchText}
                                     maxLength={120}
                    >
                        Sök efter recept
                    </SearchTextField>
                    <NavLink to="/create">
                        {
                            window.screen.width < 768 ? (
                                <AddIconButtonContainer>
                                    <Fab color="secondary"
                                         onClick={props.newRecipe}
                                    >
                                        <AddIcon/>
                                    </Fab>
                                </AddIconButtonContainer>
                            ) : (
                                <CreateRecipeButton variant="contained" color="primary"
                                                    onClick={props.newRecipe}>
                                    Lägg till recept
                                </CreateRecipeButton>
                            )
                        }
                    </NavLink>
                </SearchAddContainer>
                <SmallVSpace/>
                {props.error && (
                    <ErrorCard message={props.error}/>
                )}
                {props.error === null && (
                    <SearchListView/>
                )}
            </SearchContainer>
        </BodyContainer>
    );
}

export default Search;