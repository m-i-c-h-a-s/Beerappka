import { User } from "../profile/user";
import { Recipe } from "../recipe-creator/recipe";
import { Mashing } from "./mashing";
import { MeasurementBLG } from "./measurementBLG";

export interface Batch {
    id: number;
    user: User;
    recipe: Recipe;
    name: string;
    number: number | undefined;
    brewing_date: string;
    bottling_date: string | undefined;
    mashings: Array<Mashing>;
    measurements_blg: Array<MeasurementBLG>;
}