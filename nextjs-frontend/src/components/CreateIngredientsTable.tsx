import styles from "./CreateIngredientsTable.module.scss";
import { IconButton } from "./Buttons";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useTranslations } from "../hooks/useTranslations";
import TextField from "./TextField";
import { Ingredient } from "../api/Ingredient";
import { useState } from "react";

const INGREDIENT_BASE_ID = "ingredient";
const AMOUNT_BASE_ID = "amount";
const UNIT_BASE_ID = "unit";

interface CreateIngredientsTableProps {
  ingredients: Ingredient[];
  setIngredients: (newIngredients: Ingredient[]) => void;
}

const CreateIngredientsTable = ({
  ingredients,
  setIngredients,
}: CreateIngredientsTableProps) => {
  let { t } = useTranslations();

  const deleteIngredient = (ingredientNumber: number) => {
    let newIngredients = ingredients
      .filter((i) => i.number !== ingredientNumber)
      .map((i) => {
        if (i.number > ingredientNumber) {
          return { ...i, number: i.number - 1 };
        }
        return i;
      });
    setIngredients(newIngredients);
  };

  return (
    <div className={styles.createIngredientsContainer}>
      <h3>{t.recipe.ingredients}</h3>

      <IconButton
        icon={faPlus}
        variant="primary"
        type="button"
        size="small"
        onClick={() => {
          setIngredients([
            ...ingredients,
            { name: "", number: ingredients.length, unit: "", amount: 0 },
          ]);
        }}
      />

      {ingredients.map((ingredient, index) => {
        return (
          <CreateIngredient
            key={index}
            index={index}
            ingredient={ingredient}
            updateIngredient={(updatedIngredient: Ingredient) => {
              setIngredients(
                ingredients.map((i) => {
                  if (i.number == ingredient.number) {
                    return updatedIngredient;
                  }
                  return i;
                })
              );
            }}
            deleteIngredient={() => {
              deleteIngredient(ingredient.number);
            }}
          />
        );
      })}
      {ingredients.length > 0 && (
        <IconButton
          icon={faPlus}
          variant="primary"
          type="button"
          size="small"
          className={styles.lowerAddIngredientButton}
          onClick={() => {
            setIngredients([
              ...ingredients,
              { name: "", number: ingredients.length, unit: "", amount: 0 },
            ]);
          }}
        />
      )}
    </div>
  );
};

interface CreateIngredientProps {
  index: number;
  ingredient: Ingredient;
  updateIngredient: (ingredient: Ingredient) => void;
  deleteIngredient: () => void;
}

const CreateIngredient = ({
  index,
  ingredient,
  updateIngredient,
  deleteIngredient,
}: CreateIngredientProps) => {
  let { t } = useTranslations();

  const ingredient_id = `${INGREDIENT_BASE_ID}-${index}`;
  const amount_id = `${AMOUNT_BASE_ID}-${index}`;
  const unit_id = `${UNIT_BASE_ID}-${index}`;

  const [displayAmount, setDisplayAmount] = useState<number | undefined>(
    ingredient.amount
  );

  return (
    <div className={styles.createIngredientContainer} key={index}>
      <div>
        <label htmlFor={amount_id}>{t.recipe.ingredientAmount}</label>
        <TextField
          id={amount_id}
          name={ingredient_id}
          placeholder={t.recipe.ingredientAmount}
          value={displayAmount}
          onChange={(e) => {
            let val = parseInt(e.target.value);
            setDisplayAmount(!isNaN(val) ? val : undefined);
            if (!isNaN(val)) {
              updateIngredient({
                ...ingredient,
                amount: val,
              });
            }
          }}
          required
          min={0}
          type="number"
          step={0.05}
          max={999}
        />
      </div>
      <div>
        <label htmlFor={unit_id}>{t.recipe.ingredientUnit}</label>
        <TextField
          id={unit_id}
          name={unit_id}
          value={ingredient.unit}
          onChange={(e) => {
            updateIngredient({
              ...ingredient,
              unit: e.target.value,
            });
          }}
          placeholder={t.recipe.ingredientUnit}
          required
          maxLength={10}
        />
      </div>
      <div>
        <label htmlFor={ingredient_id}>{t.recipe.ingredient}</label>
        <TextField
          id={ingredient_id}
          name={ingredient_id}
          onChange={(e) => {
            updateIngredient({
              ...ingredient,
              name: e.target.value,
            });
          }}
          value={ingredient.name}
          placeholder={t.recipe.ingredient}
          required
        />
      </div>
      <IconButton
        className={styles.deleteIngredientButton}
        variant="secondary"
        size="small"
        icon={faMinus}
        type="button"
        onClick={deleteIngredient}
      />
    </div>
  );
};

export default CreateIngredientsTable;
