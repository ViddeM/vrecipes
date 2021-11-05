import {
    NewTagButton,
    TableHeader,
    TableRow,
    TagsActionButton,
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
import CreateTag from "./create-tag/CreateTag.container";

export const RecipeTags = props => {
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
                              props.setCreatingTag(true);
                          }}>
                Ny tagg
            </NewTagButton>
        </TagsPageToolbar>
        {props.creatingTag && (
        <CreateTag setCreatingTag={props.setCreatingTag}/>
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
    const minimal = window.screen.width <= 880;

    return (
    <TableRow>
        <TagsTableElement width={minimal ? "50%" : "15%"}>
            <Tag color={color} text={name} url={"https://google.com"}/>
        < /TagsTableElement>
        {minimal === false && (
        <>
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
        </>
        )}
        <TagsTableElement width={minimal ? "50%" : "15%"} align={"right"}>
            <TagsActionButton theme={theme}>
                Ändra
            </TagsActionButton>
            <TagsActionButton theme={theme}>
                Ta bort
            </TagsActionButton>
        </TagsTableElement>
    </TableRow>)
}