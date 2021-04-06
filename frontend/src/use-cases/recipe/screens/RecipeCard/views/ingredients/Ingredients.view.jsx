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
                <tr>
                    <th colSpan={2}>
                        <StyledText variant="h6">
                            Ingredienser
                        </StyledText>
                    </th>
                </tr>
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
                            {getIngredientAmountUnit(ingredient)}
                        </IngredientText>
                    </IngredientRowElement>
                </tr>
            ))}
            </tbody>
        </IngredientsTable>
    </IngredientsContainer>
);

function getIngredientAmountUnit(ingredient) {
    if (ingredient.amount <= 0 || ingredient.unit === "") {
        return "--"
    }

    return ingredient.amount + " " + ingredient.unit
}

export default Ingredients;