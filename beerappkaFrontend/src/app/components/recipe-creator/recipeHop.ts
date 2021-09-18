import { Hop } from "./hop";

export interface RecipeHop {
    recipe: number;
    hops: Hop;
    quantity: number;
    used_for: string;
}