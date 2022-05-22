import { Author } from "./Author";

export interface ShortRecipeBook {
  id: string;
  name: string;
  uniqueName: string;
  author: string;
  imageLink: string;
  uploadedBy: Author;
}
