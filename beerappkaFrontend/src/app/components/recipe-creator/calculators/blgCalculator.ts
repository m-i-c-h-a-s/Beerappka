import { RecipeMalt } from "../recipeMalt";

export function calculateBLG(malts: Array<RecipeMalt>, mashingEfficiency: number, beerAmountInLiters: number) {
    let extract = 0;
    let extract_ml = 0;
    let water = 0;
    let blg = Number(0);

    malts.forEach(malt => {
      extract += (malt.quantity * malt.malt.extractivity * mashingEfficiency) / 10;
    });

    extract_ml = extract / 1.587;
    water = beerAmountInLiters * 1000 - extract_ml;

    let worthWeight = water + extract;

    blg = (100 * extract / worthWeight);
    blg = parseFloat(blg.toFixed(1));

    return blg;
}