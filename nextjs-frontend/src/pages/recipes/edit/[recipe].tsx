import CardLayout from "../../../layouts/CardLayout";
import { GetServerSideProps } from "next";
import { Api, isClientSide } from "../../../api/Api";
import { Recipe } from "../../../api/Recipe";
import { useTranslations } from "../../../hooks/useTranslations";
import ErrorCard from "../../../components/ErrorCard";
import Loading from "../../../components/Loading";
import styles from "./[recipe].module.scss";
import TextField, { TextArea } from "../../../components/TextField";
import { FormEvent, useState } from "react";
import { Button } from "../../../components/Buttons";
import CreateIngredientsTable from "../../../components/CreateIngredientsTable";
import {
  EditableIngredient,
  ingredientsFromEditable,
  ingredientsToEditable,
} from "../../../api/Ingredient";
import { LOGIN_ENDPOINT, RECIPES_BASE_ENDPOINT } from "../../../api/Endpoints";
import CreateStepsList from "../../../components/CreateStepsList";
import { Step } from "../../../api/Step";
import { useMe } from "../../../hooks/useMe";
import NoAccess from "../../../components/NoAccess";
import { useRouter } from "next/router";

interface EditRecipeProps {
  recipe?: Recipe;
  dataLoadError?: string;
}

const RECIPE_NAME = "recipe_name";
const RECIPE_OVEN_TEMPERATURE = "recipe_oven_temperature";
const RECIPE_COOKING_TIME = "recipe_cooking_time";
const RECIPE_DESCRIPTION = "recipe_description";

const EditRecipe = ({ recipe, dataLoadError }: EditRecipeProps) => {
  let { t, translate } = useTranslations();
  let { isLoggedIn, me, initialized } = useMe();
  let router = useRouter();

  /* Keep track of the different parts of the state */
  const [error, setError] = useState<string | undefined>(undefined);
  const [name, setName] = useState(recipe ? recipe.name : "");
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
  const [description, setDescription] = useState(
    recipe ? recipe.description : ""
  );
  const [ingredients, setIngredients] = useState<EditableIngredient[]>(
    recipe ? ingredientsToEditable(recipe.ingredients) : []
  );
  const [steps, setSteps] = useState<Step[]>(recipe ? recipe.steps : []);
  /* End state declaration */

  if (dataLoadError) {
    return <ErrorCard error={dataLoadError} />;
  }

  if (!recipe) {
    return <Loading />;
  }

  if (!isLoggedIn && isClientSide() && initialized) {
    router.push(LOGIN_ENDPOINT);
  }

  if (me && recipe.author.id !== me?.id) {
    return <NoAccess text={t.recipe.noAccess} />;
  }

  /* Check if we have unsaved changes */
  const cookingTimeSame =
    (cookingTime !== undefined ? cookingTime : 0) === recipe?.estimatedTime;
  const tempSame =
    (ovenTemp !== undefined ? ovenTemp : 0) === recipe?.ovenTemperature;

  const unsavedChanges =
    name !== recipe?.name ||
    !cookingTimeSame ||
    !tempSame ||
    description !== recipe?.description ||
    !ingredientsSame(ingredients, ingredientsToEditable(recipe?.ingredients)) ||
    !stepsSame(steps, recipe?.steps);
  /* End check if we have unsaved changes */

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let newRecipe: Recipe = {
      id: recipe.id,
      name: name,
      uniqueName: recipe.uniqueName,
      description: description,
      ovenTemperature: ovenTemp ? ovenTemp : 0,
      estimatedTime: cookingTime ? cookingTime : 0,
      ingredients: ingredientsFromEditable(ingredients),
      steps: steps,
      images: recipe.images,
      author: recipe.author,
      tags: recipe.tags,
    };

    Api.recipes.edit(newRecipe).then((response) => {
      if (response.error && response.errorTranslationString) {
        setError(translate(response.errorTranslationString));
      } else {
        window.location.assign(`${RECIPES_BASE_ENDPOINT}/${recipe.uniqueName}`);
      }
    });
  };

  return (
    <CardLayout>
      <form
        className={`card ${styles.editRecipeCardColumn}`}
        onSubmit={onSubmit}
      >
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
              step={5}
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
              setDescription(e.target.value);
            }}
            maxLength={1000}
            className={styles.formInputElement}
            textAreaClassName={styles.textAreaElement}
          />
        </div>

        <div className={`marginTopBig ${styles.ingredientsTableContainer}`}>
          <CreateIngredientsTable
            ingredients={ingredients}
            setIngredients={setIngredients}
          />
        </div>

        <div className={`marginTopBig ${styles.ingredientsTableContainer}`}>
          <CreateStepsList steps={steps} setSteps={setSteps} />
        </div>

        {error && <p className="errorText marginTop">{error}</p>}

        <Button
          variant="primary"
          size="normal"
          type="submit"
          className="marginTop"
        >
          {t.recipe.saveRecipe}
        </Button>

        {unsavedChanges && (
          <p className={`marginTop ${styles.unsavedChangesText}`}>
            {t.common.unsavedChanges}
          </p>
        )}
      </form>
    </CardLayout>
  );
};

function ingredientsSame(
  ingredients: EditableIngredient[],
  other: EditableIngredient[]
): boolean {
  if (ingredients.length !== other.length) {
    return false;
  }

  for (let i = 0; i < ingredients.length; i++) {
    let a = ingredients[i];
    let b = other[i];
    if (
      a.name !== b.name ||
      a.amount !== b.amount ||
      a.unit !== b.unit ||
      a.number !== b.number
    ) {
      return false;
    }
  }

  return true;
}

function stepsSame(steps: Step[], other: Step[]): boolean {
  if (steps.length !== other.length) {
    return false;
  }

  for (let i = 0; i < steps.length; i++) {
    let a = steps[i];
    let b = other[i];

    if (a.number !== b.number || a.description !== b.description) {
      return false;
    }
  }

  return true;
}

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
