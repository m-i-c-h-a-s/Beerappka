import { Hop } from "./hop";
import { HopToAdd } from "./hopToAdd";

export interface RecipeHop {
    hops: HopToAdd;
    quantity: number;
    used_for: string;
    boiling_time: number;
}