import React from "react"
import {DigitButton, DigitDesign, DigitText, DigitTextField} from "@cthit/react-digit-components";
import {BodyContainer, SearchAddContainer, SearchContainer, StyledDigitCard} from "./Search.styles";
import {SmallVSpace} from "./search-list/RecipeListCard/RecipeListCard.styles.view";
import ErrorCard from "../../common/views/errorcard";
import SearchList from "./search-list"

const Search = props => {
    return (
        <BodyContainer>
            <SearchContainer>
                <StyledDigitCard>
                    <DigitText.Title text={"Välkommen till Viddes recept tjänst!"} white/>
                </StyledDigitCard>
                <SearchAddContainer>
                    <DigitTextField upperLabel={"Sök efter recept"}
                                    onChange={val => props.onSearchChanged(val.target.value)}
                                    value={props.searchText} outlined size={{width: "50%", minWidth: "300px"}}
                                    maxLength={120}
                    />
                    <DigitDesign.Link to={"/create"}>
                        <DigitButton raised primary text="Lägg till recept" margin="10px" size={{height: "50px"}}
                                     onClick={props.newRecipe}
                        />
                    </DigitDesign.Link>
                </SearchAddContainer>
                <SmallVSpace/>
                {props.error && (
                    <ErrorCard message={props.error}/>
                )}
                {props.error === null && (
                    <SearchList/>
                )}
            </SearchContainer>
        </BodyContainer>
    );
}

export default Search;