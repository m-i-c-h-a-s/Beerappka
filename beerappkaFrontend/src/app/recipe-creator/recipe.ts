export interface Recipe {
    name: string | undefined;
    type: string | undefined;
    style: string | undefined;

    amountOfBeerInLiters: number | undefined;
    boilingTimeInMinutes: number | undefined;
    evaporationSpeedPercentPerHour: number | undefined;
    boilingLossesPercent: number | undefined;
    fermentationLossesPercent: number | undefined;
    coldHoppingLossesPercent: number | undefined;

}