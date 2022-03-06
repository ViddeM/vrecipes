import { Recipe } from "../../api/Recipe";
import { GetServerSideProps } from "next";
import { Api } from "../../api/Api";
import Loading from "../../components/Loading";
import ErrorCard from "../../components/ErrorCard";
import styles from "./[recipe].module.scss";
import CardLayout from "../../layouts/CardLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { useTranslations } from "../../hooks/useTranslations";
import { RecipeImage } from "../../components/RecipeImage";
import { IngredientTable } from "../../components/IngredientTable";

type RecipeProps = {
  recipe?: Recipe;
  error?: string;
};

const Recipe = ({ recipe, error }: RecipeProps) => {
  let { t } = useTranslations();

  if (error) {
    return <ErrorCard error={error} />;
  }

  if (!recipe) {
    return <Loading />;
  }

  const image = recipe.images.length > 0 ? recipe.images[0].url : undefined;

  return (
    <CardLayout>
      <div className={`card ${styles.recipeContainer}`}>
        <div className={styles.row}>
          <h1>{recipe.name}</h1>
        </div>
        <div className={styles.infoBox}>
          <p>{`${recipe.ovenTemperature}°`}</p>
          <p className="marginLeftBig">
            {recipe.estimatedTime}
            <FontAwesomeIcon icon={faClock} className={styles.timeIcon} />
          </p>
        </div>
        <div className={styles.row}>
          <p>{`${t.common.createdBy} ${recipe.author.name}`}</p>
        </div>

        <div className={`${styles.column} marginTop`}>
          <h3>{t.recipe.description}</h3>
          <p>{recipe.description}</p>
        </div>

        <div className={styles.imageIngredientsContainer}>
          <RecipeImage url={image} />
          <div className="marginRight marginTop" />
          <IngredientTable ingredients={recipe.ingredients} />
        </div>

        <div className={`${styles.column} ${styles.alignLeft}`}>
          <h3>{t.recipe.steps}</h3>
          <div style={{ width: "100%" }}>
            {recipe.steps.map((step) => (
              <div key={step.number}>
                <div className="marginTop" />
                <div className={styles.stepRow}>
                  <p className="marginRight">{`${step.number}. `}</p>
                  <p className={styles.longText}>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </CardLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { recipe } = context.params;
  let res = await Api.recipes.getOne(recipe);

  return {
    props: {
      error: res.errorTranslationString ?? null,
      recipe: res.data ?? null,
    },
  };
};

export default Recipe;
