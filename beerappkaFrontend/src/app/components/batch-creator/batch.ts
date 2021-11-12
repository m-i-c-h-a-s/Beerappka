import { User } from "../profile/user";
import { Recipe } from "../recipe-creator/recipe";

export interface Batch {
    id: number;
    user: User;
    recipe: Recipe;
    name: string;
    number: number | undefined;
    brewing_date: string;
    bottling_date: string | undefined;
}