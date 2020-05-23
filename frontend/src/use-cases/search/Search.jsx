import React from "react"
import {DigitText, DigitTextField} from "@cthit/react-digit-components";
import {SearchContainer, SmallVSpace, StyledDigitCard, VSpace} from "./Search.styles";
import SearchList from "./search-list/SearchList.container.view";

const Search = props => (
        <SearchContainer>
            <StyledDigitCard>
                <DigitText.Title text={"Välkommen till Viddes recept tjänst!"} white />
            </StyledDigitCard>
            <VSpace />
            <DigitTextField upperLabel={"Sök efter recept"}
                            onChange={val => props.onSearchChanged(val.target.value)}
                            value={props.searchText} outlined size={{width: "50%", minWidth: "300px"}} maxLength={120}
            />
            <SmallVSpace />
            <SearchList />
        </SearchContainer>
    )
;

export default Search;