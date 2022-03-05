import styles from "./RecipeCard.module.scss";
import {ShortRecipe} from "../api/ListRecipe";

export interface RecipeCardProps {
    recipe: ShortRecipe
}

const RecipeCard = ({recipe}: RecipeCardProps) => {
    return (
        <div className={`card ${styles.recipeCard}`}>
            <h1>{recipe.name}</h1>
        </div>
    )
}

export default RecipeCard;