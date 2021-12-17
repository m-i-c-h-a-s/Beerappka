import { User } from "../profile/user";
import { Recipe } from "../recipe-creator/recipe";
import { Mashing } from "./mashing";
import { MashingForCreateUpdate } from "./mashing-for-create-update";
import { MeasurementBLG } from "./measurementBLG";
import { MeasurementBLGForCreateUpdate } from "./measurementBLG-for-create-update";

export interface Batch {
    id: number;
    user: User;
    recipe: Recipe;
    name: string;
    number: number | undefined;
    brewing_date: string;
    bottling_date: string | undefined;
    mashings: Array<MashingForCreateUpdate>;
    measurements_blg: Array<MeasurementBLGForCreateUpdate>;
}