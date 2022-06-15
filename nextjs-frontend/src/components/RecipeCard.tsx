import styles from "./RecipeCard.module.scss";
import { ShortRecipe } from "../api/ShortRecipe";
import { useTranslations } from "../hooks/useTranslations";
import TagList from "./TagList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { RecipeImage } from "./RecipeImage";
import Link from "next/link";
import { RECIPES_BASE_ENDPOINT } from "../api/Endpoints";

export interface RecipeCardProps {
  recipe: ShortRecipe;
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const { t } = useTranslations();

  return (
    <Link href={`${RECIPES_BASE_ENDPOINT}/${recipe.uniqueName}`}>
      <a className={`noStyleLink card ${styles.recipeCard}`}>
        <div className={styles.recipeCardImageContainer}>
          <RecipeImage url={recipe.imageLink} border="top" />
        </div>
        <div className={styles.recipeCardContent}>
          <h3 className={styles.recipeCardTitle}>{recipe.name}</h3>
          <p>{recipe.author.name}</p>

          {(recipe.estimatedTime > 0 || recipe.numberOfIngredients > 0) && (
            <div className={styles.flexRowBetween}>
              {recipe.estimatedTime > 0 && (
                <p>
                  {`${recipe.estimatedTime} ${t.recipe.minutesShort} `}{" "}
                  <FontAwesomeIcon icon={faClock} />
                </p>
              )}
              {recipe.numberOfIngredients > 0 && (
                <p>
                  {`${recipe.numberOfIngredients} ${t.recipe.ingredients}`}{" "}
                </p>
              )}
            </div>
          )}

          <TagList variant={"fadeOverflow"} tags={recipe.tags} noLink={true} />
        </div>
      </a>
    </Link>
  );
};

export default RecipeCard;
