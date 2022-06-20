import { Author } from "./Author";
import { Image } from "./Image";

export interface RecipeBook {
  id: string;
  name: string;
  uniqueName: string;
  image: Image;
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
