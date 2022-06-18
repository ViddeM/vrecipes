import { useTranslations } from "../hooks/useTranslations";
import { RECIPE_BOOKS_BASE_ENDPOINT } from "../api/Endpoints";
import { ShortRecipeBook } from "../api/ShortRecipeBook";
import defaultRecipeBookImage from "../../public/default-recipe-book-image.webp";
import styles from "./RecipeBookCard.module.scss";
import Link from "next/link";
import { RecipeImage } from "./RecipeImage";

export interface RecipeBookCardProps {
  recipeBook: ShortRecipeBook;
}

const RecipeBookCard = ({ recipeBook }: RecipeBookCardProps) => {
  const { t } = useTranslations();

  return (
    <Link href={`${RECIPE_BOOKS_BASE_ENDPOINT}/${recipeBook.uniqueName}`}>
      <a className={`noStyleLink card ${styles.recipeBookCard}`}>
        <div className={styles.recipeBookCardImageContainer}>
          <RecipeImage
            defaultImage={defaultRecipeBookImage}
            url={recipeBook.imageLink}
            border="top"
          />
        </div>
        <div className={styles.recipeBookCardContent}>
          <h3 className={styles.recipeBookCardTitle}>{recipeBook.name}</h3>
          <p className={styles.recipeBookCardTitle}>{recipeBook.author}</p>

          <div className={styles.fill} />

          <div className={styles.bottomRightAligned}>
            <p>{`${t.recipeBook.uploadedBy} ${recipeBook.uploadedBy.name}`}</p>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default RecipeBookCard;
