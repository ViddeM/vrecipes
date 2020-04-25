import React from "react"
import {DigitButton, DigitText, DigitTextField} from "@cthit/react-digit-components";
import {SearchContainer, SmallVSpace, VSpace} from "./Search.styles";

const Search = props => (
        <SearchContainer>
            <DigitText.Heading5 text={"Välkommen till Viddes recept tjänst!"} />
            <VSpace />
            <DigitTextField upperLabel={"Sök efter recept"} onChange={val => props.onSearchChanged(val.target.value)}
                            value={props.searchText} outlined size={{width: "300px"}} />
            <SmallVSpace />
            <DigitButton text={"Sök"} raised primary size={{width: "300px"}} />
        </SearchContainer>
    )
;

export default Search;