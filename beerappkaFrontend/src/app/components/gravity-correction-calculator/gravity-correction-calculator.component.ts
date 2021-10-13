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


  constructor() {
    this.amountOfBeerInLiters = null;
    this.currentGravity = null;
    this.expectedGravity = null;
  }

  ngOnInit(): void {
  }


  calculateCorrection() {

  }
}
