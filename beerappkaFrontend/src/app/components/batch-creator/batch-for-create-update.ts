import { User } from "../profile/user";

export interface BatchForCreateUpdate {
    name: string;
    number: number | undefined;
    brewing_date: string;
    bottling_date: string | undefined;
    recipe: number;
}