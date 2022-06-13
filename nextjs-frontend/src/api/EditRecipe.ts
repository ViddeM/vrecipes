import { Step } from "./Step";
import { Ingredient } from "./Ingredient";
import { Image } from "./Image";
import { Author } from "./Author";

export interface EditRecipe {
  id: string;
  name: string;
  uniqueName: string;
  description: string;
  ovenTemperature: number;
  estimatedTime: number;
  steps: Step[];
  ingredients: Ingredient[];
  images: Image[];
  author: Author;
  tags: string[];
}
