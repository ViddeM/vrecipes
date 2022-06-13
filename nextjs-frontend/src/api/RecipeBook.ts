import { Image } from "./Image";
import { Author } from "./Author";

export interface RecipeBook {
  id: string;
  name: string;
  uniqueName: string;
  images: Image[];
  recipes: RecipeBookRecipe[];
  uploadedBy: Author;
  author: string;
}

export interface RecipeBookRecipe {
  id: string;
  name: string;
  uniqueName: string;
  author: string;
}
