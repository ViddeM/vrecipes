import { Recipe } from "../../api/Recipe";
import { GetServerSideProps } from "next";
import { Api } from "../../api/Api";
import Loading from "../../components/Loading";
import ErrorCard from "../../components/ErrorCard";
import styles from "./[recipe].module.scss";
import CardLayout from "../../layouts/CardLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useTranslations } from "../../hooks/useTranslations";
import { RecipeImage } from "../../components/RecipeImage";
import { IngredientTable } from "../../components/IngredientTable";
import Tag from "../../components/Tag";
import { Button, IconButton } from "../../components/Buttons";
import Link from "next/link";

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
        <div className={`${styles.row}`}>
          <Link href={"/"}>
            <IconButton variant="opaque" icon={faArrowLeft} />
          </Link>

          <div className={styles.infoBox}>
            <p>{`${t.recipe.oven} ${recipe.ovenTemperature}°`}</p>
            <p className="marginLeftBig">
              {recipe.estimatedTime}
              <FontAwesomeIcon icon={faClock} className={styles.timeIcon} />
            </p>
          </div>
        </div>

        <h1>{recipe.name}</h1>

        <p>{`${t.common.createdBy} ${recipe.author.name}`}</p>

        <div className={`marginTopBig ${styles.column}`}>
          <h3>{t.recipe.description}</h3>
          <p>{recipe.description}</p>
        </div>

        <div className={styles.tagsContainer}>
          {recipe.tags.map((tag) => (
            <Tag noLink={false} color={tag.color} text={tag.name} />
          ))}
        </div>

        <div className={styles.imageIngredientsContainer}>
          <div className={styles.growContainer}>
            <RecipeImage url={image} />
          </div>
          <div className="marginRight marginTop" />
          <div className={styles.growContainer}>
            <IngredientTable ingredients={recipe.ingredients} />
          </div>
        </div>

        <div className={`${styles.column} ${styles.alignLeft}`}>
          <h3>{t.recipe.steps}</h3>
          <div className={styles.recipeDivider} />
          <div style={{ width: "100%" }}>
            {recipe.steps.map((step) => (
              <div key={step.number}>
                <div className={styles.stepSpace} />
                <div className={styles.stepRow}>
                  <p className="marginRight">{`${step.number + 1}. `}</p>
                  <p className={styles.longText}>{step.description}</p>
                </div>
              </div>
            ))}
            <div className={styles.stepSpace} />
          </div>
        </div>

        <div className={`marginBottom ${styles.recipeDivider}`} />

        <div className={styles.row}>
          {/*  Footer with edit/delete actions*/}
          <Button variant="secondary" size="normal">
            Delete
          </Button>
          <Button variant="primary" size="normal">
            Edit
          </Button>
        </div>
      </div>
    </CardLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // @ts-ignore
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
