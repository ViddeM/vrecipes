import React from "react";
import {
    BottomRow,
    RecipeBookAuthorsContainer,
    RecipeBookCardContainer,
    RecipeBookCardContentContainer,
    RecipeBookCardImage,
    RecipeBookHLine,
    RecipeBookRecipeData,
    RecipeBookRecipeRow,
    RecipeBookRecipesTable, RecipeLink
} from "./RecipeBookCard.styles";
import {Center, StyledText} from "../../../common/styles/Common.styles";
import {
    TopRow
} from "../../recipe/screens/RecipeCard/RecipeCard.styles.screen";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import {Typography} from "@material-ui/core";
import {useHistory} from "react-router";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";

export const RecipeBookCard = props => {
    let history = useHistory()
    const imageUrl = "/static/images/default_book_2.png"

    return (
    <RecipeBookCardContainer>
        <TopRow>
            <IconButton onClick={() => history.goBack()}>
                <ArrowBackIcon/>
            </IconButton>
        </TopRow>
        <RecipeBookCardContentContainer>
            <Center>
                <Typography variant="h4">
                    {props.book.name}
                </Typography>
            </Center>
            <RecipeBookHLine/>
            <RecipeBookAuthorsContainer>
                <StyledText variant="subtitle1">
                    {"Författare: " + props.book.author}
                </StyledText>
                <StyledText variant="subtitle1">
                    {"Upplagd av " + props.book.uploadedBy.name}
                </StyledText>
            </RecipeBookAuthorsContainer>
            <RecipeBookHLine/>
            <Center>
                <RecipeBookCardImage src={imageUrl} alt="Kunde inte visa bild"/>
            </Center>
            <RecipeBookRecipesTable>
                <thead>
                    <RecipeBookRecipeRow>
                        <th>
                            <StyledText variant="h6" align="left">
                                Receptnamn
                            </StyledText>
                        </th>
                        <th>
                            <StyledText variant="h6" align="right">
                                Upplagd av
                            </StyledText>
                        </th>
                    </RecipeBookRecipeRow>
                </thead>
                <tbody>
                {props.book.recipes.map(r => (
                    <RecipeBookRecipeRow>
                        <RecipeBookRecipeData>
                            <RecipeLink href={"/recipes/" + r.uniqueName}>
                                <StyledText variant="subtitle1">
                                    {r.name}
                                </StyledText>
                            </RecipeLink>
                        </RecipeBookRecipeData>
                        <RecipeBookRecipeData>
                            <StyledText variant="subtitle1" align="right">
                                {r.author}
                            </StyledText>
                        </RecipeBookRecipeData>
                    </RecipeBookRecipeRow>
                ))}
                </tbody>
            </RecipeBookRecipesTable>
            <BottomRow>
                <Button variant="contained"
                        color="secondary"
                >
                    Ta bort
                </Button>
                <Button variant="contained"
                        color="primary"
                >
                    Redigera
                </Button>
            </BottomRow>
        </RecipeBookCardContentContainer>
    </RecipeBookCardContainer>
    );
}