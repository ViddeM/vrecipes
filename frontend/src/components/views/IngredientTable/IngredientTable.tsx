import { useState } from "react";

import { Ingredient } from "../../../api/Ingredient";
import { useTranslations } from "../../../hooks/useTranslations";
import TextField from "../../elements/TextField/TextField";

import styles from "./IngredientTable.module.scss";

export type IngredientTableProps = {
  ingredients: Ingredient[];
  portions: number;
};

export const IngredientTable = ({
  ingredients,
  portions = 1,
}: IngredientTableProps) => {
  const { t } = useTranslations();

  const [scaledPortions, setScaledPortions] = useState(portions);

  const ingredientScaling = isNaN(scaledPortions)
    ? 1
    : scaledPortions / portions;
  return (
    <div className={styles.ingredientsContainer}>
      <table className={styles.ingredientTable}>
        <thead>
          <tr>
            <th colSpan={2}>
              <div className={styles.ingredientTitle}>
                <h3>{t.recipe.ingredients}</h3>
                <TextField
                  placeholder={portions.toString()}
                  onChange={(e) =>
                    setScaledPortions(parseFloat(e.target.value))
                  }
                  type={"number"}
                  min={0}
                  step={"any"}
                  max={999}
                  className={styles.portionForm}

                  postfixText={t.recipe.portionsSmall}
                />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {ingredients.map((ingredient, index) => (
            <tr key={index}>
              {ingredient.isHeading ? (
                <td colSpan={2}>
                  <h3 className={styles.ingredientHeading}>
                    {ingredient.name}
                  </h3>
                </td>
              ) : (
                <>
                  <td
                    className={`${styles.ingredientNameContainer} ${styles.ingredientRowElement}`}
                  >
                    <p className="alignLeft">{ingredient.name}</p>
                  </td>
                  <td className={styles.ingredientRowElement}>
                    <p className="alignRight">
                      {getIngredientAmountUnit(ingredient, ingredientScaling)}
                    </p>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

function getIngredientAmountUnit(
  ingredient: Ingredient,
  ingredientScaling: number
): string {
  if (ingredient.amount <= 0 || ingredient.unit === "") {
    return "--";
  }

  return `${ingredient.amount * ingredientScaling} ${ingredient.unit}`;
}
