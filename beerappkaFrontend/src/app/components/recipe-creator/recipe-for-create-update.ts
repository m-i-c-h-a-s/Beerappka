import { BeerStyle } from "./beerStyle";
import { RecipeHop } from "./recipeHop";
import { RecipeMalt } from "./recipeMalt";
import { RecipeYeast } from "./recipeYeast";

export interface RecipeForCreateUpdate {
    name: string;
    type: string;
    is_public: boolean;
    boiling_time: number;
    expected_beer_amount: number;
    boiled_wort_amount: number;
    evaporation_rate: number;
    boiling_losses: number;
    fermentation_losses: number;
    cold_hop_losses: number;
    mashing_performance: number;
    water_to_grain_ratio: number;
    notes: string;
    blg: number;
    abv: number;
    ebc: number;
    style: number | undefined;
    malts: Array<RecipeMalt>;
    hops: Array<RecipeHop>;
    yeast: Array<RecipeYeast>;
}