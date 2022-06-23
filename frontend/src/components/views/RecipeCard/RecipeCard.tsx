import { faClock } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

import { RECIPES_BASE_ENDPOINT } from "../../../api/Endpoints";
import { ShortRecipe } from "../../../api/ShortRecipe";
import { useTranslations } from "../../../hooks/useTranslations";
import { ImageComponent } from "../../elements/ImageComponent/ImageComponent";
import TagList from "../../elements/TagList/TagList";

import styles from "./RecipeCard.module.scss";

export interface RecipeCardProps {
  recipe: ShortRecipe;
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const { t } = useTranslations();

  return (
    <Link href={`${RECIPES_BASE_ENDPOINT}/${recipe.uniqueName}`}>
      <a className={`noStyleLink card ${styles.recipeCard}`}>
        <div className={styles.recipeCardImageContainer}>
          <ImageComponent url={recipe.imageLink} border="none" />
        </div>
        <div className={styles.recipeCardContent}>
          <h3 className={styles.recipeCardTitle}>{recipe.name}</h3>
          <p>{recipe.author.name}</p>

          {(recipe.estimatedTime > 0 || recipe.numberOfIngredients > 0) && (
            <div className={styles.flexRowBetween}>
              <p>
                {recipe.estimatedTime > 0 && (
                  <>
                    {`${recipe.estimatedTime} ${t.recipe.minutesShort} `}{" "}
                    <FontAwesomeIcon icon={faClock} />
                  </>
                )}
              </p>
              <p>{`${recipe.numberOfIngredients} ${t.recipe.ingredients}`}</p>
            </div>
          )}

          <TagList variant={"fadeOverflow"} tags={recipe.tags} noLink={true} />
        </div>
      </a>
    </Link>
  );
};

export default RecipeCard;
