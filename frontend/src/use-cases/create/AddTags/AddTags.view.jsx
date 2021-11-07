import React from "react";
import {FormColumn, FormRow, StyledCard} from "../Create.styles";
import {StyledText} from "../../../common/styles/Common.styles";
import TagSelect from "../../../common/elements/tag-select/TagSelect.container";

export const AddTags = props => {
    return (
    <StyledCard>
        <FormColumn>
            <FormRow>
                <StyledText variant="h6">
                    Taggar
                </StyledText>
            </FormRow>
            <FormRow>
                <TagSelect selectedTags={props.selectedTags}
                           selectTags={props.selectTags}/>
            </FormRow>
        </FormColumn>
    </StyledCard>
    )
}