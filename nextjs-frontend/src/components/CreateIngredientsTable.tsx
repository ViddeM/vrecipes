import styles from "./CreateIngredientsTable.module.scss";
import { IconButton } from "./Buttons";
import {
  faArrowDown,
  faArrowUp,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslations } from "../hooks/useTranslations";
import TextField from "./TextField";
import { Ingredient } from "../api/Ingredient";
import { useEffect, useState } from "react";

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

  const changeIngredientPosition = (ingredientNumber: number, up: boolean) => {
    // Ensure that it doesn't go above the max number of ingredients (0 indexed).
    let newNumber = Math.min(ingredientNumber + 1, ingredients.length - 1);

    if (up) {
      // Ensure that it doesn't go below 0
      newNumber = Math.max(ingredientNumber - 1, 0);
    }

    let newIngredients = ingredients
      .map((ing) => {
        if (ing.number === ingredientNumber) {
          return {
            ...ing,
            number: newNumber,
          };
        } else {
          // Swap place with the row that is where we want to be
          if (ing.number === newNumber) {
            return {
              ...ing,
              number: ingredientNumber,
            };
          }
        }

        return ing;
      })
      .sort((a, b) => {
        return a.number - b.number;
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

      <div className={styles.ingredientRows}>
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
              totalIngredients={ingredients.length}
              deleteIngredient={() => {
                deleteIngredient(ingredient.number);
              }}
              changeIngredientPosition={(up: boolean) =>
                changeIngredientPosition(ingredient.number, up)
              }
            />
          );
        })}
      </div>

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
  changeIngredientPosition: (up: boolean) => void;
  totalIngredients: number;
}

const CreateIngredient = ({
  index,
  ingredient,
  updateIngredient,
  deleteIngredient,
  changeIngredientPosition,
  totalIngredients,
}: CreateIngredientProps) => {
  let { t } = useTranslations();

  const ingredientId = `${INGREDIENT_BASE_ID}-${index}`;
  const amountId = `${AMOUNT_BASE_ID}-${index}`;
  const unitId = `${UNIT_BASE_ID}-${index}`;

  const [isFirstRow, setIsFirstRow] = useState(false);
  const [isLastRow, setIsLastRow] = useState(false);
  const [displayAmount, setDisplayAmount] = useState<number | undefined>(
    ingredient.amount
  );

  useEffect(() => {
    setDisplayAmount(ingredient.amount);
  }, [ingredient.amount]);
  useEffect(() => {
    setIsFirstRow(ingredient.number === 0);
    setIsLastRow(ingredient.number === totalIngredients - 1);
  }, [ingredient.number]);

  return (
    <div className={styles.createIngredientContainer} key={index}>
      <div className={styles.upDownButtonGroup}>
        <IconButton
          className={styles.deleteIngredientButton}
          variant="opaque"
          size="small"
          icon={faArrowUp}
          type="button"
          onClick={() => changeIngredientPosition(true)}
          disabled={isFirstRow}
        />
        <IconButton
          className={styles.deleteIngredientButton}
          variant="opaque"
          size="small"
          icon={faArrowDown}
          type="button"
          onClick={() => changeIngredientPosition(false)}
          disabled={isLastRow}
        />
      </div>
      <div>
        <label htmlFor={amountId}>{t.recipe.ingredientAmount}</label>
        <TextField
          id={amountId}
          name={amountId}
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
          min={0}
          type="number"
          step={0.05}
          max={999}
        />
      </div>
      <div>
        <label htmlFor={unitId}>{t.recipe.ingredientUnit}</label>
        <TextField
          id={unitId}
          name={unitId}
          value={ingredient.unit}
          onChange={(e) => {
            updateIngredient({
              ...ingredient,
              unit: e.target.value,
            });
          }}
          placeholder={t.recipe.ingredientUnit}
          maxLength={10}
        />
      </div>
      <div>
        <label htmlFor={ingredientId}>{t.recipe.ingredient}</label>
        <TextField
          id={ingredientId}
          name={ingredientId}
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
        variant="secondary"
        size="small"
        icon={faMinus}
        type="button"
        onClick={deleteIngredient}
        className={styles.deleteIngredientButton}
      />
    </div>
  );
};

export default CreateIngredientsTable;
