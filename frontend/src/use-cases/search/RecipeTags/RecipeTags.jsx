import {
    ColorPickerBase,
    ColorPickerCover,
    NewTagActionButton,
    NewTagActionButtonGroup,
    NewTagButton,
    NewTagColorButton,
    NewTagContainer,
    NewTagRow,
    TableHeader,
    TableRow,
    TagsActionButton,
    TagsColorPicker,
    TagsPageTable,
    TagsPageToolbar,
    TagsTable,
    TagsTableElement,
    TagsTableText,
    TagsTextField
} from "./RecipeTags.styles";
import {Link, Typography} from "@material-ui/core";
import {Tag} from "../../../common/elements/Tag/Tag";
import {useTheme} from "@material-ui/core/styles";
import {useState} from "react";
import CachedIcon from '@material-ui/icons/Cached';

export const RecipeTags = props => {
    const [creatingTag, setCreatingTag] = useState(false);
    const [colorPickerOpen, toggleColorPicker] = useState(false);
    const [newTagColor, setNewTagColor] = useState(randomColor());
    const [newTagName, setNewTagName] = useState("");
    const [newTagDescription, setNewTagDescription] = useState("");

    return (
    <TagsPageTable>
        <TagsPageToolbar>
            <TagsTextField variant="outlined"
                           label={"Sök efter recept tagg"}
                           value={props.searchText}
                           onChange={e => props.onSearch(e.target.value)}

            />
            <NewTagButton color="primary" variant="contained"
                          onClick={() => {
                              setCreatingTag(true);
                              setNewTagName("");
                              setNewTagDescription("");
                              setNewTagColor(randomColor());
                          }}>
                Ny recept tagg
            </NewTagButton>
        </TagsPageToolbar>
        {creatingTag && (
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
                               }}/>
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
                <NewTagActionButtonGroup>
                    <NewTagActionButton variant="outlined"
                                        onClick={() => setCreatingTag(false)}>
                        Avbryt
                    </NewTagActionButton>
                    <NewTagActionButton color="primary" variant="contained"
                                        disabled={newTagName === ""}>
                        Skapa Tagg
                    </NewTagActionButton>
                </NewTagActionButtonGroup>
            </NewTagRow>
        </NewTagContainer>
        )}
        <TagsTable>
            <TableHeader>
                <Typography>
                    {props.tags.length + " taggar"}
                </Typography>
            </TableHeader>
            {props.tags.map(tag => (
            <TagRow tag={tag} key={tag.name}/>
            ))}
        </TagsTable>
    </TagsPageTable>
    )
}

export default RecipeTags;

const TagRow = props => {
    const {color, description, name, recipeCount, author} = props.tag;
    const theme = useTheme();
    return (
    <TableRow>
        <TagsTableElement width="15%">
            <Tag color={color} text={name} url={"https://google.com"}/>
        < /TagsTableElement>
        <TagsTableElement width="40%" buffer={"16px"}>
            <TagsTableText>
                {description}
            </TagsTableText>
        </TagsTableElement>
        <TagsTableElement width="10%" buffer={"16px"}>
            {recipeCount > 0 && (
            <TagsTableText display={"block"}>
                <Link href={"/"}>
                    {recipeCount + " recept"}
                </Link>
            </TagsTableText>
            )}
        </TagsTableElement>
        <TagsTableElement width="20%" buffer={"16px"}>
            <TagsTableText>
                {author.name}
            </TagsTableText>
        </TagsTableElement>
        <TagsTableElement width="15%" align={"right"}>
            <TagsActionButton theme={theme}>
                Ändra
            </TagsActionButton>
            <TagsActionButton theme={theme}>
                Ta bort
            </TagsActionButton>
        </TagsTableElement>
    </TableRow>)
}

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