import CardLayout from "../../../layouts/CardLayout";
import { GetServerSideProps } from "next";
import { Api } from "../../../api/Api";
import { Recipe } from "../../../api/Recipe";
import { useTranslations } from "../../../hooks/useTranslations";
import ErrorCard from "../../../components/ErrorCard";
import Loading from "../../../components/Loading";
import styles from "./[recipe].module.scss";
import TextField, { TextArea } from "../../../components/TextField";
import { useState } from "react";
import { Button } from "../../../components/Buttons";
import CreateIngredientsTable from "../../../components/CreateIngredientsTable";

interface EditRecipeProps {
  recipe?: Recipe;
  error?: string;
}

const RECIPE_NAME = "recipe_name";
const RECIPE_OVEN_TEMPERATURE = "recipe_oven_temperature";
const RECIPE_COOKING_TIME = "recipe_cooking_time";
const RECIPE_DESCRIPTION = "recipe_description";

const EditRecipe = ({ recipe, error }: EditRecipeProps) => {
  let { t } = useTranslations();

  const [name, setName] = useState(recipe?.name);
  const [cookingTime, setCookingTime] = useState(
    recipe?.estimatedTime && recipe?.estimatedTime > 0
      ? recipe?.estimatedTime
      : undefined
  );
  const [ovenTemp, setOvenTemp] = useState(
    recipe?.ovenTemperature && recipe.ovenTemperature > 0
      ? recipe?.ovenTemperature
      : undefined
  );
  const [description, setDesription] = useState(recipe?.description);

  if (error) {
    return <ErrorCard error={error} />;
  }

  if (!recipe) {
    return <Loading />;
  }

  return (
    <CardLayout>
      <form className={`card ${styles.editRecipeCardColumn}`}>
        <h3>{t.recipe.editRecipe}</h3>

        {/* Recipe name */}
        <div className={styles.formRow}>
          <label htmlFor={RECIPE_NAME} className={styles.formLabel}>
            {t.recipe.recipeName}
          </label>
          <TextField
            name={RECIPE_NAME}
            id={RECIPE_NAME}
            placeholder={t.recipe.recipeName}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            required
            maxLength={120}
            className={styles.formInputElement}
          />
        </div>

        <div className={styles.splitFormRow}>
          {/* Cooking time */}
          <div className={styles.splitFormRowElement}>
            <label htmlFor={RECIPE_COOKING_TIME} className={styles.formLabel}>
              {t.recipe.cookingTime}
            </label>
            <TextField
              name={RECIPE_COOKING_TIME}
              id={RECIPE_COOKING_TIME}
              placeholder={t.recipe.cookingTime}
              value={cookingTime}
              onChange={(e) => {
                let number = parseInt(e.target.value);
                setCookingTime(number);
              }}
              type="number"
              step={5}
              min={0}
              max={999}
              className={styles.formInputElement}
              postfixText={t.recipe.minutes}
            />
          </div>

          <div className="space" />

          {/* Oven temperature */}
          <div className={styles.splitFormRowElement}>
            <label
              htmlFor={RECIPE_OVEN_TEMPERATURE}
              className={styles.formLabel}
            >
              {t.recipe.ovenTemperature}
            </label>
            <TextField
              name={RECIPE_OVEN_TEMPERATURE}
              id={RECIPE_OVEN_TEMPERATURE}
              placeholder={t.recipe.ovenTemperature}
              value={ovenTemp}
              onChange={(e) => {
                let number = parseInt(e.target.value);
                setOvenTemp(number);
              }}
              type="number"
              min={0}
              max={999}
              className={styles.formInputElement}
              inputClassName={styles.splitRowInput}
              postfixText={t.recipe.degrees}
            />
          </div>
        </div>

        {/* Description */}
        <div className={styles.formRow}>
          <label htmlFor={RECIPE_DESCRIPTION} className={styles.formLabel}>
            {t.recipe.description}
          </label>
          <TextArea
            name={RECIPE_DESCRIPTION}
            id={RECIPE_DESCRIPTION}
            placeholder={t.recipe.description}
            value={description}
            onChange={(e) => {
              setDesription(e.target.value);
            }}
            maxLength={1000}
            className={styles.formInputElement}
            textAreaClassName={styles.textAreaElement}
          />
        </div>

        <div className={`marginTopBig ${styles.ingredientsTableContainer}`}>
          <CreateIngredientsTable />
        </div>

        <Button
          variant="primary"
          size="normal"
          type="submit"
          className="marginTopBig"
        >
          {t.recipe.saveRecipe}
        </Button>
      </form>
    </CardLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // @ts-ignore
  const { recipe } = context.params;
  let res = await Api.recipes.getOne(recipe);

  if (res.rawResponse?.status === 404) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      error: res.errorTranslationString ?? null,
      recipe: res.data ?? null,
    },
  };
};

export default EditRecipe;
