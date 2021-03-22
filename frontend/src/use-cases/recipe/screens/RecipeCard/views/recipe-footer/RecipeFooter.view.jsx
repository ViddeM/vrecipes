import React from "react"
import {RecipeFooterColumns, RecipeFooterContainer} from "./RecipeFooter.styles.view";
import {DigitButton} from "@cthit/react-digit-components";
import {WideHLine} from "../../../../../../common/styles/Common.styles";

const RecipeFooter = props => (
    <RecipeFooterColumns>
        <WideHLine/>
        <RecipeFooterContainer>
            <DigitButton primary raised text="Redigera" size={{width: "200px"}}
                         onClick={() => {
                             props.editRecipe(props.recipe)

                         }}/>
            <DigitButton secondary raised text="Ta bort" size={{width: "200px"}}
                         onClick={() => props.deleteRecipe(props.recipe.id)}/>
        </RecipeFooterContainer>
    </RecipeFooterColumns>
);

export default RecipeFooter;