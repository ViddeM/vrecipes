import { Author } from "./Author";
import { RGBColor } from "./Color";

export interface Tag {
  id: string;
  name: string;
  description: string;
  color: RGBColor;
  recipeCount: number;
  author: Author;
}
