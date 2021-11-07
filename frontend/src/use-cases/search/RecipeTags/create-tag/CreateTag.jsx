import {
    ColorPickerBase,
    ColorPickerCover,
    NewTagActionButton,
    NewTagActionButtonGroup,
    NewTagColorButton,
    NewTagColorSelectContainer,
    NewTagContainer,
    NewTagRow,
    TagsColorPicker
} from "./CreateTag.styles";
import {Tag} from "../../../../common/elements/tag/Tag";
import CachedIcon from "@material-ui/icons/Cached";
import {useEffect, useState} from "react";
import {TagsTextField} from "../RecipeTags.styles";
import {translations} from "../../../../common/translations/ResponseMessages";
import {ErrorText} from "../../../create/Create.styles";

export const CreateTag = props => {
    const [colorPickerOpen, toggleColorPicker] = useState(false);
    const [newTagColor, setNewTagColor] = useState({});
    const [newTagName, setNewTagName] = useState("");
    const [newTagDescription, setNewTagDescription] = useState("");

    useEffect(() => {
        setNewTagColor(props.color ? props.color : randomColor());
        setNewTagName(props.name ? props.name : "");
        setNewTagDescription(props.description ? props.description : "");
    }, [props.name, props.color, props.description]);

    const tagNameTaken = props.createTagError === translations.tag_name_taken;

    return (
    <NewTagContainer>
        <NewTagRow>
            <Tag color={newTagColor}
                 text={newTagName === "" ? "Förhandsvisning" : newTagName}/>
        </NewTagRow>
        <NewTagRow>
            <TagsTextField variant="outlined" label="Taggnamn"
                           value={newTagName}
                           onChange={e => {
                               let val = e.target.value;
                               if (val.length <= 30) {
                                   setNewTagName(val)
                               }
                           }}
                           error={tagNameTaken}
                           errormessage={"Taggnamnet är redan taget"}
            />
            <TagsTextField
            variant="outlined"
            label="Beskrivning (valfritt)"
            value={newTagDescription}
            onChange={e => {
                let val = e.target.value;
                if (val.length <= 120) {
                    setNewTagDescription(val);
                }
            }}/>
            <NewTagColorSelectContainer>
                <NewTagColorButton
                onClick={e => {
                    e.preventDefault();
                    toggleColorPicker(!colorPickerOpen);
                }}
                color={newTagColor}
                />
                {colorPickerOpen &&
                <div style={{position: "relative"}}>
                    <ColorPickerBase>
                        <ColorPickerCover
                        onClick={() => toggleColorPicker(!colorPickerOpen)}/>
                        <TagsColorPicker disableAlpha={true}
                                         onChange={val => setNewTagColor(val.rgb)}
                                         color={newTagColor}
                        />
                    </ColorPickerBase>
                </div>
                }
                <NewTagActionButton
                onClick={() => setNewTagColor(randomColor())}>
                    <CachedIcon style={{paddingRight: "5px"}}/>
                    Slumpa Färg
                </NewTagActionButton>
            </NewTagColorSelectContainer>
            <NewTagActionButtonGroup>
                <NewTagActionButton variant="outlined"
                                    onClick={() => props.setCreatingTag(false)}>
                    Avbryt
                </NewTagActionButton>
                <NewTagActionButton color="primary" variant="contained"
                                    disabled={newTagName === ""}
                                    onClick={() => {
                                        if (props.editing) {
                                            props.editTag(props.tagId, newTagName, newTagDescription, newTagColor)
                                        } else {
                                            props.saveTag(newTagName, newTagDescription, newTagColor)
                                        }
                                    }}
                >
                    {props.editing ? "Spara ändringar" : "Skapa Tagg"}
                </NewTagActionButton>
            </NewTagActionButtonGroup>
        </NewTagRow>
        <NewTagRow>
            {(props.createTagError && props.createTagError !== "" && !tagNameTaken) && (
            <ErrorText>
                {props.createTagError}
            </ErrorText>
            )}
        </NewTagRow>
    </NewTagContainer>
    )
}
;

function randomColor() {
    return {
        r: randomU8(),
        g: randomU8(),
        b: randomU8()
    }
}

function randomU8() {
    return Math.floor(Math.random() * 255);
}

export default CreateTag;