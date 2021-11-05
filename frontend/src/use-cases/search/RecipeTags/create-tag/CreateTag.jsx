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
import {Tag} from "../../../../common/elements/Tag/Tag";
import CachedIcon from "@material-ui/icons/Cached";
import {useState} from "react";
import {TagsTextField} from "../RecipeTags.styles";

export const CreateTag = props => {
    const [colorPickerOpen, toggleColorPicker] = useState(false);
    const [newTagColor, setNewTagColor] = useState(randomColor());
    const [newTagName, setNewTagName] = useState("");
    const [newTagDescription, setNewTagDescription] = useState("");
    const [sameNameError, setSameNameError] = useState(false);

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
                                   setSameNameError(false);
                               }
                           }}
                           error={sameNameError}
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
                                        let nameTaken = false;
                                        props.tags.forEach(tag => {
                                            if (tag.name.toLowerCase() === newTagName.toLowerCase()) {
                                                nameTaken = true;
                                            }
                                        })
                                        if (nameTaken) {
                                            setSameNameError(true);
                                        } else {
                                            props.saveTag(newTagName, newTagDescription, newTagColor)
                                            setSameNameError(false);
                                        }
                                    }}
                >
                    Skapa Tagg
                </NewTagActionButton>
            </NewTagActionButtonGroup>
        </NewTagRow>
    </NewTagContainer>
    )
};

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