import styles from "./IngredientTable.module.scss";
import { Ingredient } from "../api/Ingredient";

export type IngredientTableProps = {
  ingredients: Ingredient[];
};

export const IngredientTable = ({ ingredients }: IngredientTableProps) => {
  return (
    <div className={styles.ingredientsContainer}>
      <table className={styles.ingredientTable}>
        <thead>
          <tr>
            <th colSpan={2}>
              <h3>Ingredienser</h3>
            </th>
          </tr>
        </thead>
        <tbody>
          {ingredients.map((ingredient, index) => (
            <tr key={index}>
              <td
                className={`${styles.ingredientNameContainer} ${styles.ingredientRowElement}`}
              >
                <p className="align-left">{ingredient.name}</p>
              </td>
              <td className={styles.ingredientRowElement}>
                <p className="align-right">
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
