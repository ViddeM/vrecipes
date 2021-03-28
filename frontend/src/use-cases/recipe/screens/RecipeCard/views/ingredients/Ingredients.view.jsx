import React from "react"
import {
    IngredientNameContainer,
    IngredientRowElement,
    IngredientsContainer,
    IngredientsTable,
    IngredientText
} from "./Ingredients.styles.view";
import {SubtitleText} from "../../../../../../common/styles/Common.styles";

const Ingredients = props => (
    <IngredientsContainer>
        <IngredientsTable>
            <thead>
            <th colSpan={2}>
                <SubtitleText text={"Ingredienser"} alignCenter/>
            </th>
            </thead>
            <tbody>
            {props.ingredients.map((ingredient, index) => (
                <tr key={index}>
                    <IngredientNameContainer>
                        <IngredientText text={ingredient.name} leftAlign/>
                    </IngredientNameContainer>
                    <IngredientRowElement>
                        <IngredientText text={ingredient.amount + " " + ingredient.unit} alignRight/>
                    </IngredientRowElement>
                </tr>
            ))}
            </tbody>
        </IngredientsTable>
    </IngredientsContainer>
);

export default Ingredients;