import styled from "styled-components"
import {Card} from "@material-ui/core";
import Link from "@material-ui/core/Link";

export const RecipeBookCardContainer = styled(Card)`
    padding: 10px 10px 0px;
    margin: 0px 20px 20px;
    flex: 1;
    width: 100%;
    max-width: 800px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
`

export const RecipeBookAuthorsContainer = styled.div`
  margin: 0 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const BottomRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 10px 10px 0 10px;
`;

export const RecipeBookHLine = styled.div`
  margin: 0 10px;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.3)
`;

export const RecipeBookCardContentContainer = styled.div`
    width: 100%;
    padding: 20px;
`;

export const RecipeBookCardImage = styled.img`
  margin: 10px 10px;
  height: auto;
  max-width: calc(100% - 20px);
`

export const RecipeBookRecipesTable = styled.table`
  width: 100%;
  padding: 0 10px;
  border: 1px solid gray;
  border-radius: 10px;
  border-spacing: 0;
`

export const RecipeBookRecipeRow = styled.tr`

`

export const RecipeBookRecipeData = styled.td`
  border-top: 1px solid gray;
  padding: 5px;
`

export const RecipeLink = styled(Link)`

`