import { Yeast } from "./yeast";
import { YeastToAdd } from "./yeastToAdd";

export interface RecipeYeast {
    yeast: YeastToAdd;
    quantity: number;
    form: string;
}