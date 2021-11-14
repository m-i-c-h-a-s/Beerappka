import { Manufacturer } from "./manufacturer";

export interface Yeast {
    id: number;
    name: string;
    type: string;
    manufacturer: Manufacturer;
    is_default: false,
}