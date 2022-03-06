import { RGBColor } from "./Color";
import { Author } from "./Author";

export interface Tag {
  id: string;
  name: string;
  description: string;
  color: RGBColor;
  recipeCount: number;
  author: Author;
}
