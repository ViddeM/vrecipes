import { Author } from "./Author";
import { Tag } from "./Tag";

export interface ShortRecipe {
  id: string;
  name: string;
  uniqueName: string;
  imageLink: string;
  author: Author;
  tags: Tag[];
  estimatedTime: number;
  numberOfIngredients: number;
}
