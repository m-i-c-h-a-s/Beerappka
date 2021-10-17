import { User } from "../profile/user";
import { Recipe } from "../recipe-creator/recipe";

export interface BatchForCreateUpdate {
    user: User;
    recipe: Recipe;
    name: string;
    number: number;
    brewing_date: string;
}