import { Ingredient } from "../api/Ingredient";
import { useTranslations } from "../hooks/useTranslations";

import styles from "./IngredientTable.module.scss";

export type IngredientTableProps = {
  ingredients: Ingredient[];
};

export const IngredientTable = ({ ingredients }: IngredientTableProps) => {
  const { t } = useTranslations();
  return (
    <div className={styles.ingredientsContainer}>
      <table className={styles.ingredientTable}>
        <thead>
          <tr>
            <th colSpan={2}>
              <h3>{t.recipe.ingredients}</h3>
            </th>
          </tr>
        </thead>
        <tbody>
          {ingredients.map((ingredient, index) => (
            <tr key={index}>
              <td
                className={`${styles.ingredientNameContainer} ${styles.ingredientRowElement}`}
              >
                <p className="alignLeft">{ingredient.name}</p>
              </td>
              <td className={styles.ingredientRowElement}>
                <p className="alignRight">
                  {getIngredientAmountUnit(ingredient)}
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

function getIngredientAmountUnit(ingredient: Ingredient): string {
  if (ingredient.amount <= 0 || ingredient.unit === "") {
    return "--";
  }

  return `${ingredient.amount} ${ingredient.unit}`;
}
