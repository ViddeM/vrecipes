import styles from "./RecipeCard.module.scss";
import { ShortRecipe } from "../api/ShortRecipe";
import { useTranslations } from "../hooks/useTranslations";
import { useState } from "react";
import TagContainer from "./TagContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";

export interface RecipeCardProps {
  recipe: ShortRecipe;
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const { t } = useTranslations();

  const [errored, setErrored] = useState(false);

  const URL_PREFIX = "api/static/images/";

  let imageUrl = recipe.imageLink;
  if (imageUrl === undefined || imageUrl === "") {
    imageUrl = "/default_recipe_image.png";
  } else {
    imageUrl = URL_PREFIX + imageUrl;
  }

  // Backup in case the image can't be rendered, such as pdfs in non safari browsers.
  if (errored) {
    imageUrl = "static/images/default_recipe.png";
  }

  console.log(recipe);

  return (
    <div className={`card ${styles.recipeCard}`}>
      <img
        alt={t.recipe.imageAltText}
        src={imageUrl}
        onError={() => {
          setErrored(true);
        }}
      />
      <div className={styles.recipeCardContent}>
        <h3 className={styles.recipeCardTitle}>{recipe.name}</h3>
        <p>{recipe.author.name}</p>
        <div className={styles.flexRowBetween}>
          <p>
            <FontAwesomeIcon icon={faClock} />
          </p>
          <p> {t.recipe.ingredients} TEMP </p>
        </div>

        <TagContainer tags={recipe.tags} noLink={true} />
      </div>
    </div>
  );
};

export default RecipeCard;
