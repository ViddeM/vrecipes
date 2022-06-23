import { useEffect, useRef, useState } from "react";

import {
  faArrowDown,
  faArrowUp,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";

import { EditableIngredient } from "../../../api/Ingredient";
import { useTranslations } from "../../../hooks/useTranslations";
import { IconButton } from "../../elements/Buttons/Buttons";
import TextField from "../../elements/TextField/TextField";

import styles from "./CreateIngredientsTable.module.scss";

const INGREDIENT_BASE_ID = "ingredient";
const AMOUNT_BASE_ID = "amount";
const UNIT_BASE_ID = "unit";

interface CreateIngredientsTableProps {
  ingredients: EditableIngredient[];
  setIngredients: (newIngredients: EditableIngredient[]) => void;
}

const CreateIngredientsTable = ({
  ingredients,
  setIngredients,
}: CreateIngredientsTableProps) => {
  const { t } = useTranslations();

  const deleteIngredient = (ingredientNumber: number) => {
    const newIngredients = ingredients
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

    const newIngredients = ingredients
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

  const addIngredientToBeginning = () => {
    setIngredients([
      { name: "", number: 0, unit: "", amount: 0 },
      ...ingredients.map((i) => {
        return { ...i, number: i.number + 1 };
      }),
    ]);
  };

  const addIngredientToEnd = () => {
    setIngredients([
      ...ingredients,
      { name: "", number: ingredients.length, unit: "", amount: 0 },
    ]);
  };

  return (
    <div className={styles.createIngredientsContainer}>
      <h3>{t.recipe.ingredients}</h3>
      <div className={styles.ingredientRowsContainer}>
        {ingredients.length > 0 && (
          <>
            <button
              className={`${styles.addNewIngredientRow} ${styles.firstRow}`}
              onClick={addIngredientToBeginning}
              type="button"
            >
              Add new ingredient
            </button>
            <div className={styles.ingredientRows}>
              {ingredients.map((ingredient, index) => {
                return (
                  <CreateIngredient
                    key={index}
                    index={index}
                    ingredient={ingredient}
                    updateIngredient={(
                      updatedIngredient: EditableIngredient
                    ) => {
                      setIngredients(
                        ingredients.map((i) => {
                          if (i.number === ingredient.number) {
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
          </>
        )}
        <button
          className={`${styles.addNewIngredientRow} ${styles.lastRow}`}
          onClick={addIngredientToEnd}
          type="button"
        >
          Add new ingredient
        </button>
      </div>
    </div>
  );
};

interface CreateIngredientProps {
  index: number;
  ingredient: EditableIngredient;
  updateIngredient: (ingredient: EditableIngredient) => void;
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
  const { t } = useTranslations();

  const ingredientId = generateIngredientId(ingredient.number);
  const amountId = generateAmountId(ingredient.number);
  const unitId = generateUnitId(ingredient.number);

  const amountElemRef = useRef<HTMLInputElement | null>(null);
  const unitElemRef = useRef<HTMLInputElement | null>(null);

  const [isFirstRow, setIsFirstRow] = useState(false);
  const [isLastRow, setIsLastRow] = useState(false);

  useEffect(() => {
    setIsFirstRow(ingredient.number === 0);
    setIsLastRow(ingredient.number === totalIngredients - 1);
  }, [ingredient.number, totalIngredients]);

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
          externalRef={amountElemRef}
          value={ingredient.amount ? ingredient.amount : ""}
          onChange={(e) => {
            const val = parseFloat(e.target.value);

            let newAmount = 0;
            if (!isNaN(val) && val > 0) {
              newAmount = val;
            }

            amountElemRef.current?.setCustomValidity("");
            if (newAmount === undefined && ingredient.unit !== "") {
              amountElemRef.current?.setCustomValidity(
                t.recipe.ingredientValidationErrors.amountMustBeFilledIn
              );
            } else if (newAmount !== undefined && ingredient.unit === "") {
              unitElemRef.current?.setCustomValidity(
                t.recipe.ingredientValidationErrors.unitMustBeFilledIn
              );
            }

            updateIngredient({
              ...ingredient,
              amount: newAmount,
            });
          }}
          min={0.05}
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
          externalRef={unitElemRef}
          onChange={(e) => {
            const val = e.target.value;

            unitElemRef.current?.setCustomValidity("");
            if (val === "" && ingredient.amount !== 0) {
              unitElemRef.current?.setCustomValidity(
                t.recipe.ingredientValidationErrors.unitMustBeFilledIn
              );
            } else if (val !== "" && ingredient.amount === 0) {
              amountElemRef.current?.setCustomValidity(
                t.recipe.ingredientValidationErrors.amountMustBeFilledIn
              );
            }

            updateIngredient({
              ...ingredient,
              unit: val,
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

function generateIngredientId(number: number): string {
  return `${INGREDIENT_BASE_ID}-${number}`;
}

function generateAmountId(number: number): string {
  return `${AMOUNT_BASE_ID}-${number}`;
}

function generateUnitId(number: number): string {
  return `${UNIT_BASE_ID}-${number}`;
}
