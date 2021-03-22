import React from "react"
import {RecipeFooterColumns, RecipeFooterContainer} from "./RecipeFooter.styles.view";
import {DigitButton, DigitText, useDigitCustomDialog} from "@cthit/react-digit-components";
import {SmallHSpace, WideHLine} from "../../../../../../common/styles/Common.styles";
import {ButtonContainer} from "../../../../../create/CreateIngredients/CreateIngredients.styles.view";

const RecipeFooter = props => {
    const [openDialogConfirmation] = useDigitCustomDialog({
        title: "Bekräfta",
        confirmButtonText: "Ja",
        cancelButtonText: "Nej"
    });

    return (
        <RecipeFooterColumns>
            <WideHLine/>
            <RecipeFooterContainer>
                <DigitButton secondary raised text="Ta bort" size={{width: "200px"}}
                             onClick={() => {
                                 openDialogConfirmation(getDialog(props.recipe.id, props.deleteRecipe))
                             }}/>
                <DigitButton primary raised text="Redigera" size={{width: "200px"}}
                             onClick={() => {
                                 props.editRecipe(props.recipe)
                             }}/>
            </RecipeFooterContainer>
        </RecipeFooterColumns>
    )
};

function getDialog(id, onRemove) {
    return {
        renderMain: () => (
            <DigitText.Text
                text={"Är du säker på att du vill ta bort detta recept?"}/>
        ),
        renderButtons: (confirm, cancel) => (
            <ButtonContainer>
                <DigitButton
                    raised
                    secondary
                    text={"NEJ"}
                    onClick={cancel}
                    flex={"1"}
                />
                <SmallHSpace/>
                <DigitButton
                    raised
                    primary
                    text={"JA"}
                    onClick={confirm}
                    flex={"1"}
                />
            </ButtonContainer>
        ),
        onConfirm: () => {
            onRemove(id);
        }
    }
}


export default RecipeFooter;