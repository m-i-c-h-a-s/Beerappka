import { Hop } from "./hop";

export interface RecipeHop {
    hops: Hop;
    quantity: number;
    used_for: string;
    boiling_time: number;
}