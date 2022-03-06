import { Step } from "./Step";
import { Ingredient } from "./Ingredient";
import { Image } from "./Image";
import { Author } from "./Author";
import { Tag } from "./Tag";

export interface Recipe {
  id: string;
  name: string;
  uniqueName: string;
  description: string;
  ovenTemperature: string;
  estimatedTime: string;
  steps: Step[];
  ingredients: Ingredient[];
  images: Image[];
  author: Author;
  tags: Tag[];
}
