import { User } from "../profile/user";
import { BeerStyle } from "./beerStyle";
import { RecipeHop } from "./recipeHop";
import { RecipeMalt } from "./recipeMalt";
import { RecipeYeast } from "./recipeYeast";

export interface Recipe {
    id: number;
    name: string;
    type: string;
    creation_date: string;
    is_public: boolean;
    boiling_time: number;
    expected_beer_amount: number;
    boiled_wort_amount: number;
    evaporation_rate: number;
    boiling_losses: number;
    fermentation_losses: number;
    cold_hop_losses: number;
    mashing_efficiency: number;
    water_to_grain_ratio: number;
    notes: string;
    blg: number;
    abv: number;
    ebc: number;
    user: User;
    style: BeerStyle;
    malts: Array<RecipeMalt>;
    hops: Array<RecipeHop>;
    yeast: Array<RecipeYeast>;
}