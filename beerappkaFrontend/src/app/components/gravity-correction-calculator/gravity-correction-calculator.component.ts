import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gravity-correction-calculator',
  templateUrl: './gravity-correction-calculator.component.html',
  styleUrls: ['./gravity-correction-calculator.component.sass']
})
export class GravityCorrectionCalculatorComponent implements OnInit {

  public amountOfBeerInLiters: number | null;
  public currentGravity: number | null;
  public expectedGravity: number | null;
  public calculationResult: string = '';


  constructor() {
    this.amountOfBeerInLiters = null;
    this.currentGravity = null;
    this.expectedGravity = null;
  }

  ngOnInit(): void {
  }


  calculateCorrection() {
    var waterAdditionValue: number | undefined;
    let sugarAdditionValue: number | undefined;
    var waterAddition: string | undefined;
    let sugarAddition: string | undefined;

    if (this.amountOfBeerInLiters != null && this.currentGravity != null && this.expectedGravity != null
    && this.amountOfBeerInLiters > 0 && this.currentGravity > 0 && this.expectedGravity > 0) {
      if (this.currentGravity > this.expectedGravity) {
        waterAdditionValue = ((this.currentGravity - this.expectedGravity) / this.expectedGravity) * this.amountOfBeerInLiters;
        waterAddition = waterAdditionValue.toFixed(1);
        this.calculationResult = "W celu zmniejszenia poziomu gęstości dodaj " + waterAddition + "L wody.";
      }
      else if (this.currentGravity < this.expectedGravity) {
        sugarAdditionValue = (this.expectedGravity - this.currentGravity) * this.amountOfBeerInLiters * 11;
        sugarAddition = sugarAdditionValue.toFixed(0);
        this.calculationResult = "W celu zwiększenia poziomu gęstości dodaj " + sugarAddition + "g cukru.";
      }
      else {
        this.calculationResult = "";
      }
    } else {
      this.calculationResult = "";
    }
  }
}
