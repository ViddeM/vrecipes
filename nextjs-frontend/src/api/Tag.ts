import {Color} from "./Color";
import {Author} from "./Author";

export interface Tag {
    id: string,
    name: string,
    description: string,
    color: Color,
    recipeCount: number,
    author: Author
}