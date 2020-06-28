import React from "react"
import { IngredientContainer, IngredientsContainer, IngredientText } from "./Ingredients.styles.view";
import { Center, HLine, TitleText } from "../../../../../../common/styles/Common.styles";

const Ingredients = props => (
    <IngredientsContainer>
        <Center>
            <TitleText text={"Ingredienser"} />
        </Center>
        <Center>
            <HLine />
        </Center>
        {props.ingredients.map((ingredient, index) => (
            <IngredientContainer key={index}>
                {index > 0 && (
                    <HLine />
                )}
                <IngredientText text={getFormattedIngredient(ingredient)} />
            </IngredientContainer>
        ))}
    </IngredientsContainer>
);

function getFormattedIngredient(ingredient) {
    return ingredient.amount + " " + ingredient.unit + " " + ingredient.name;
}

export default Ingredients;