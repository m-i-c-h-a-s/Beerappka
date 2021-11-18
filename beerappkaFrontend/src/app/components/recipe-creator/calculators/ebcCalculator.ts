import { RecipeMalt } from "../recipeMalt";

export function calculateEBC(malts: Array<RecipeMalt>, mashingEfficiency: number, beerAmountInLiters: number) {
    let ebc = Number(0);

    let sumOfWeightEbcProducts = 0;

    malts.forEach(malt => {
        let weightEbcProduct = malt.quantity * malt.malt.color;
        sumOfWeightEbcProducts += weightEbcProduct;
    });

    ebc = 2.9396 * (4.23 * sumOfWeightEbcProducts / beerAmountInLiters) * 0.6859;
    ebc = parseFloat(ebc.toFixed(1));

    return ebc;
}