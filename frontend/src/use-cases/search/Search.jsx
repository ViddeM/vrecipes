import React from "react"
import {DigitText, DigitTextField} from "@cthit/react-digit-components";
import {BodyContainer, SearchContainer, StyledDigitCard} from "./Search.styles";
import SearchList from "./search-list/SearchList.container.view";
import {SmallVSpace} from "../../common/styles/Common.styles";
import ErrorCard from "../../common/views/errorcard";

const Search = props => (
        <BodyContainer>
            <SearchContainer>
                <StyledDigitCard>
                    <DigitText.Title text={"Välkommen till Viddes recept tjänst!"} white />
                </StyledDigitCard>
                <DigitTextField upperLabel={"Sök efter recept"}
                                onChange={val => props.onSearchChanged(val.target.value)}
                                value={props.searchText} outlined size={{width: "50%", minWidth: "300px"}}
                                maxLength={120}
                />
                <SmallVSpace />
                {props.error &&
                <ErrorCard message={props.error} />}
                {props.error === null &&
                <SearchList />
                }
            </SearchContainer>
        </BodyContainer>
    )
;

export default Search;