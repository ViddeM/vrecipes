import styles from "./RecipeCard.module.scss";
import { ShortRecipe } from "../api/ListRecipe";
import { useTranslations } from "../hooks/useTranslations";
import {useState} from "react";

export interface RecipeCardProps {
  recipe: ShortRecipe;
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const { t } = useTranslations();

  const [errored, setErrored] = useState(false);

  let imageUrl = recipe.imageLink;
  if (imageUrl === undefined || imageUrl === "") {
    imageUrl = "/default_recipe_image.png"
  } else {
    imageUrl = getImageUrl(imageUrl)
  }
  if (errored) {
    if (imageUrl.endsWith(".pdf")) {
      imageUrl = "static/images/pdf_not_supported.png"
    } else {
      imageUrl = "static/images/default_recipe.png"
    }
  }

  return (
    <div className={`card ${styles.recipeCard}`}>
      <img alt={t.recipe.imageAltText} src={recipe.imageLink} onError={() => {
        setErrored(true);
      }}/>
      <h1>{recipe.name}</h1>
    </div>
  );
};

export default RecipeCard;
