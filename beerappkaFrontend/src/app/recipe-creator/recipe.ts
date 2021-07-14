export interface Recipe {
    name: string;
    type: string;
    style: string;

    amountOfBeerInLiters: number;
    boilingTimeInMinutes: number;
    evaporationSpeedPercentPerHour: number;
    boilingLossesPercent: number;
    fermentationLossesPercent: number;
    coldHoppingLossesPercent: number;

}