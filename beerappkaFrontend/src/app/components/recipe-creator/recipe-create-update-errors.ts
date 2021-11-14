export interface RecipeCreateUpdateErrors {
  name: Array<string> | null;
  type: Array<string> | null;
  style: Array<string> | null;
  boiling_time: Array<string> | null;
  expected_beer_amount: Array<string> | null;
  boiled_wort_amount: Array<string> | null;
  evaporation_rate: Array<string> | null;
  boiling_losses: Array<string> | null;
  fermentation_losses: Array<string> | null;
  cold_hop_losses: Array<string> | null;
  mashing_efficiency: Array<string> | null;
  water_to_grain_ratio: Array<string> | null;
  non_field_errors: Array<string> | null;
}
