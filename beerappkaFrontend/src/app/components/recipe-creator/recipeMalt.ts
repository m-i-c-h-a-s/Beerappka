import { Malt } from "./malt";

export interface RecipeMalt {
    id: number;
    recipe: number;
    malt: Malt;
    quantity: number;
}