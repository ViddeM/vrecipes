import styles from "./RecipeCard.module.scss";

const RecipeCard = () => {
    return (
        <div className={`card ${styles.recipeCard}`}>
            <h1>RECIPE!</h1>
        </div>
    )
}

export default RecipeCard;