import React from "react"
import {IngredientContainer, IngredientsContainer} from "./Ingredients.styles.view";
import {Center, HLine, IngredientText, TitleText} from "../../../../../../common/styles/Common.styles";
import {getFormattedIngredient} from "../../../../../../common/functions/formatting";

const Ingredients = props => (
    <IngredientsContainer>
        <Center>
            <TitleText text={"Ingredienser"}/>
        </Center>
        <Center>
            <HLine/>
        </Center>
        {props.ingredients.map((ingredient, index) => (
            <IngredientContainer key={index}>
                {index > 0 && (
                    <HLine/>
                )}
                <IngredientText text={getFormattedIngredient(ingredient)}/>
            </IngredientContainer>
        ))}
    </IngredientsContainer>
);

export default Ingredients;