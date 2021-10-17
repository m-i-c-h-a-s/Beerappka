import { Manufacturer } from "./manufacturer";

export interface YeastToAdd {
    name: string;
    type: string;
    manufacturer: Manufacturer;
    is_default: false,
}