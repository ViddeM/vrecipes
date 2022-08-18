import { useState } from "react";

import { Ingredient } from "../../../api/Ingredient";
import { useTranslations } from "../../../hooks/useTranslations";
import TextField from "../../elements/TextField/TextField";

import styles from "./IngredientTable.module.scss";

export type IngredientTableProps = {
  ingredients: Ingredient[];
  portions: number | undefined;
};

export const IngredientTable = ({
  ingredients,
  portions,
}: IngredientTableProps) => {
  const { t } = useTranslations();

  const [scaledPortions, setScaledPortions] = useState(portions ?? 1);

  const useScaling = portions !== undefined && portions > 0;

  const ingredientScaling =
    isNaN(scaledPortions) || !useScaling ? 1 : scaledPortions / portions;

  return (
    <div className={styles.ingredientsContainer}>
      <table className={styles.ingredientTable}>
        <thead>
          <tr>
            <th colSpan={2}>
              <div className={styles.ingredientTitle}>
                <h3>{t.recipe.ingredients}</h3>
                {useScaling && (
                  <TextField
                    variant="opaque"
                    placeholder={`(${portions.toString()})`}
                    onChange={(e) =>
                      setScaledPortions(parseFloat(e.target.value))
                    }
                    type={"number"}
                    min={0}
                    step={1}
                    max={999}
                    className={styles.portionForm}
                    postfixText={t.recipe.portionsSmall}
                  />
                )}
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
