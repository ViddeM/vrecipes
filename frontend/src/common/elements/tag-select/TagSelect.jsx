import {Autocomplete} from "@material-ui/lab";
import {
    TagColorDot,
    TagMenuColumn,
    TagMenuItem
} from "../../../use-cases/create/Create.styles";
import {Checkbox, TextField} from "@material-ui/core";
import {Tag} from "../tag/Tag";
import React, {useEffect} from "react";

export const TagSelect = (props) => {
    const {loadTags, allTags, selectedTags, selectTags} = props

    useEffect(() => {
        loadTags()
    }, [loadTags])
    
    return (
    <Autocomplete id="tag-select"
                  multiple
                  options={allTags}
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
                      selectTags(value)
                  }}
                  value={selectedTags}
    />
    )
}