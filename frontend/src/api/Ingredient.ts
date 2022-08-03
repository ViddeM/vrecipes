export interface Ingredient {
  name: string;
  unit: string;
  amount: number;
  number: number;
  isHeading: boolean;
}

export interface EditableIngredient {
  name: string;
  unit: string;
  amount: number | undefined;
  number: number;
  isHeading: boolean;
}

export function ingredientsToEditable(
  ingredients: Ingredient[]
): EditableIngredient[] {
  return ingredients.map((ing) => {
    return {
      ...ing,
      amount: ing.amount === 0 ? undefined : ing.amount,
    };
  });
}

export function ingredientsFromEditable(
  ingredients: EditableIngredient[]
): Ingredient[] {
  return ingredients.map((ing) => {
    return {
      ...ing,
      amount: ing.amount ? ing.amount : 0,
    };
  });
}
