import { Author } from "./Author";
import { Image } from "./Image";
import { Ingredient } from "./Ingredient";
import { Step } from "./Step";
import { Tag } from "./Tag";

export interface Recipe {
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
  tags: Tag[];
  portions: number;
  portionsSuffix: string;
}
