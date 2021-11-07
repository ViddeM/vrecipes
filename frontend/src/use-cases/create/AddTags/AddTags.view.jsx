import React, {useEffect} from "react";
import {FormColumn, FormRow, StyledCard} from "../Create.styles";
import {StyledText} from "../../../common/styles/Common.styles";
import TagSelect from "../../../common/elements/tag-select/TagSelect";

export const AddTags = props => {
    const {loadTags, allTags, selectedTags, selectTags} = props

    useEffect(() => {
        loadTags()
    }, [loadTags])

    return (
    <StyledCard>
        <FormColumn>
            <FormRow>
                <StyledText variant="h6">
                    Taggar
                </StyledText>
            </FormRow>
            <FormRow>
                <TagSelect selectedTags={selectedTags}
                           selectTags={selectTags}
                           allTags={allTags}
                />
            </FormRow>
        </FormColumn>
    </StyledCard>
    )
}