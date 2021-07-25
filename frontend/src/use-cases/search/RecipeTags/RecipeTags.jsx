import {
    NewTagButton,
    TableHeader,
    TableRow,
    TagsActionButton,
    TagSearchTextField,
    TagsPageTable,
    TagsPageToolbar,
    TagsTable,
    TagsTableElement,
    TagsTableText
} from "./RecipeTags.styles";
import {Link, Typography} from "@material-ui/core";
import {Tag} from "../../../common/elements/Tag/Tag";
import {useTheme} from "@material-ui/core/styles";

export const RecipeTags = props => {
    return (
    <TagsPageTable>
        <TagsPageToolbar>
            <TagSearchTextField variant="outlined"
                                label={"Sök efter recept tagg"}
                                value={props.searchText}
                                onChange={e => props.onSearch(e.target.value)}
            />
            <NewTagButton color="primary" variant="contained">
                Ny recept tagg
            </NewTagButton>
        </TagsPageToolbar>
        <TagsTable>
            <TableHeader>
                <Typography>
                    {props.tags.length + " taggar"}
                </Typography>
            </TableHeader>
            {props.tags.map(tag => (
            <TagRow tag={tag}/>
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
        <TagsTableElement width="25%">
            <Tag color={color} text={name} url={"https://google.com"}/>
        < /TagsTableElement>
        <TagsTableElement width="30%" buffer={"16px"}>
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
