import { RecipeHop } from "../recipeHop";

// funkcja wyliczająca poziom IBU (poziom goryczy w piwie)
// została zaimplementowana na podstawie Metody Ragera (https://www.realbeer.com/hops/FAQ.html#forms)
export function calculateIBU(beerVolume: number, boilGravity: number, hops: Array<RecipeHop>) {
    let gravityAdjustment = 0;
    boilGravity = blgToSg(boilGravity);

    if (boilGravity > 1.050) {
        gravityAdjustment = (boilGravity - 1.050) / 0.2;
    }

    let ibu = Number(0);

    hops.forEach(hop => {
        let hopIBU = Number(0);
        hopIBU = (hop.quantity * (calculateHopUtilization(hop.boiling_time) / 100) * (hop.hops.alpha_acids / 100) * 1000) / (beerVolume * (1 + gravityAdjustment));
        ibu += hopIBU;
    });

    ibu = parseFloat(ibu.toFixed(1));

    return ibu;
}

function calculateHopUtilization(time: number) {
    // tabela określająca procent utylizacji chmielu, w zależności od czasu gotowania
    const HopsUtilizationTable = [
        {time: 0, utilization: 5.0},
        {time: 1, utilization: 5.0},
        {time: 2, utilization: 5.0},
        {time: 3, utilization: 5.0},
        {time: 4, utilization: 5.0},
        {time: 5, utilization: 5.0},
        {time: 6, utilization: 6.0},
        {time: 7, utilization: 6.0},
        {time: 8, utilization: 6.0},
        {time: 9, utilization: 6.0},
        {time: 10, utilization: 6.0},
        {time: 11, utilization: 8.0},
        {time: 12, utilization: 8.0},
        {time: 13, utilization: 8.0},
        {time: 14, utilization: 8.0},
        {time: 15, utilization: 8.0},
        {time: 16, utilization: 10.1},
        {time: 17, utilization: 10.1},
        {time: 18, utilization: 10.1},
        {time: 19, utilization: 10.1},
        {time: 20, utilization: 10.1},
        {time: 21, utilization: 12.1},
        {time: 22, utilization: 12.1},
        {time: 23, utilization: 12.1},
        {time: 24, utilization: 12.1},
        {time: 25, utilization: 12.1},
        {time: 26, utilization: 15.3},
        {time: 27, utilization: 15.3},
        {time: 28, utilization: 15.3},
        {time: 29, utilization: 15.3},
        {time: 30, utilization: 15.3},
        {time: 31, utilization: 18.8},
        {time: 32, utilization: 18.8},
        {time: 33, utilization: 18.8},
        {time: 34, utilization: 18.8},
        {time: 35, utilization: 18.8},
        {time: 36, utilization: 22.8},
        {time: 37, utilization: 22.8},
        {time: 38, utilization: 22.8},
        {time: 39, utilization: 22.8},
        {time: 40, utilization: 22.8},
        {time: 41, utilization: 26.9},
        {time: 42, utilization: 26.9},
        {time: 43, utilization: 26.9},
        {time: 44, utilization: 26.9},
        {time: 45, utilization: 26.9},
      ];

      time = Math.round(time);
      if (time > 45) time = 45;
      else if (time < 0) time = 0;

      let utilization = 5;
      const index = HopsUtilizationTable.findIndex(x => x.time === time);
      if (index !== -1)
        utilization = HopsUtilizationTable[index].utilization;

      return utilization;
}

// funkcja przeliczająca gęstość ze skali BLG (Skala Ballinga - zwana także skalą Plato) na skalę SG (Specific Gravity)
// została zaimplementowana na podstawie wzoru ze strony http://betatestbrewing.com/pages/plato_to_sg.html
function blgToSg(blg: number) {
    return 1 + (blg / (258.6 - 227.1 * (blg / 258.2)));
}