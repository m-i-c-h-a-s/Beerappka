export interface Recipe {
    name: string | undefined;
    type: string | undefined;
    style: string | undefined;

    amountOfBeerInLiters: number | null;
    boilingTimeInMinutes: number | null;
    evaporationSpeedPercentPerHour: number | null;
    boilingLossesPercent: number | null;
    fermentationLossesPercent: number | null;
    dryHoppingLossesPercent: number | null;

    amountOfBoilingWortInLiters: number | null;
    blgBeforeBoiling: number | null;
    amountOfSweetWortInLiters: number | null;
    amountOfBeerBeforeDryHoppingInLiters: number | null;

}