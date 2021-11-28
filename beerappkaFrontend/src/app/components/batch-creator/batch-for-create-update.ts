import { MashingForCreateUpdate } from "./mashing-for-create-update";
import { MeasurementBLGForCreateUpdate } from "./measurementBLG-for-create-update";

export interface BatchForCreateUpdate {
    name: string;
    number: number | undefined;
    brewing_date: string;
    bottling_date: string | undefined;
    recipe: number;
    mashings: Array<MashingForCreateUpdate>;
    measurements_blg: Array<MeasurementBLGForCreateUpdate>;
}