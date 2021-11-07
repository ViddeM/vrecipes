import React, {useEffect} from "react";
import {
    FormColumn,
    FormRow,
    StyledCard,
    TagColorDot,
    TagMenuColumn,
    TagMenuItem
} from "../Create.styles";
import {StyledText} from "../../../common/styles/Common.styles";
import {Checkbox, TextField} from "@material-ui/core";
import {Autocomplete} from "@material-ui/lab";
import {Tag} from "../../../common/elements/Tag/Tag";

export const AddTags = props => {
    const {loadTags} = props;

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
                <Autocomplete id="tag-select"
                              multiple
                              options={props.allTags}
                              disableCloseOnSelect
                              autoComplete
                              autoHighlight
                              getOptionLabel={val => val.name}
                              renderOption={(tag, {selected}) => (
                              <TagMenuItem key={tag.id} value={tag}>
                                  <Checkbox
                                  checked={selected}/>
                                  <TagColorDot color={tag.color}/>
                                  <TagMenuColumn>
                                        <span style={{fontWeight: "bold"}}>
                                            {tag.name}
                                        </span>
                                      <span>
                                            {tag.description}
                                        </span>
                                  </TagMenuColumn>
                              </TagMenuItem>
                              )}
                              style={{width: "100%"}}
                              renderInput={params => (
                              <TextField {...params}
                                         variant="outlined"
                                         label="Taggar"
                                         placeholder="Favorites"
                              />
                              )}
                              renderTags={tags => {
                                  return tags.map(tag => (
                                  <Tag key={tag.id} color={tag.color}
                                       url={"google.com"}
                                       text={tag.name}/>
                                  ))
                              }}
                              filterOptions={(tags, state) => {
                                  const searchStr = state.inputValue.toLowerCase()
                                  return tags.filter(tag => tag.name.toLowerCase().includes(searchStr)
                                  || tag.description.toLowerCase().includes(searchStr))
                              }}
                              onChange={(e, value, reason) => {
                                  props.selectTags(value.map(tag => tag.id))
                              }}
                />
            </FormRow>
        </FormColumn>
    </StyledCard>
    )
}