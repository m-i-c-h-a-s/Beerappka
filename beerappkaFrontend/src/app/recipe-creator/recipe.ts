export interface Recipe {
    name: string;
    type: string;
    style: string;

    amountOfBeer: number;
    boilingTime: number;
    evaporationSpeed: number;
    boilingLosses: number;
    fermentationLosses: number;
    coldHoppingLosses: number;

}