import React from "react"
import {
    IngredientNameContainer,
    IngredientRowElement,
    IngredientsContainer,
    IngredientsTable,
    IngredientText
} from "./Ingredients.styles.view";
import {StyledText} from "../../../../../../common/styles/Common.styles";

const Ingredients = props => (
    <IngredientsContainer>
        <IngredientsTable>
            <thead>
            <th colSpan={2}>
                <StyledText variant="h6">
                    Ingredienser
                </StyledText>
            </th>
            </thead>
            <tbody>
            {props.ingredients.map((ingredient, index) => (
                <tr key={index}>
                    <IngredientNameContainer>
                        <IngredientText align="left">
                            {ingredient.name}
                        </IngredientText>
                    </IngredientNameContainer>
                    <IngredientRowElement>
                        <IngredientText align="right">
                            {ingredient.amount + " " + ingredient.unit}
                        </IngredientText>
                    </IngredientRowElement>
                </tr>
            ))}
            </tbody>
        </IngredientsTable>
    </IngredientsContainer>
);

export default Ingredients;