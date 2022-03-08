import styles from "./RecipeCard.module.scss";
import { ShortRecipe } from "../api/ShortRecipe";
import { useTranslations } from "../hooks/useTranslations";
import TagContainer from "./TagContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { RecipeImage } from "./RecipeImage";
import Link from "next/link";

const RECIPES_ENDPOINT = "/recipes";

export interface RecipeCardProps {
  recipe: ShortRecipe;
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const { t } = useTranslations();

  return (
    <Link href={`${RECIPES_ENDPOINT}/${recipe.uniqueName}`}>
      <div className={`card ${styles.recipeCard}`}>
        <div>
          <RecipeImage url={recipe.imageLink} />
        </div>
        <div className={styles.recipeCardContent}>
          <h3 className={styles.recipeCardTitle}>{recipe.name}</h3>
          <p>{recipe.author.name}</p>
          <div className={styles.flexRowBetween}>
            <p>
              TEMP TIME <FontAwesomeIcon icon={faClock} />
            </p>
            <p> {t.recipe.ingredients} TEMP NO </p>
          </div>

          <TagContainer tags={recipe.tags} noLink={true} />
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
