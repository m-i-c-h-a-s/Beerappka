import { Component, OnInit } from '@angular/core';
import { beerStyleCarbonationInfo } from './beerStyleCarbonationInfo';

@Component({
  selector: 'app-carbonation-calculator',
  templateUrl: './carbonation-calculator.component.html',
  styleUrls: ['./carbonation-calculator.component.sass']
})
export class CarbonationCalculatorComponent implements OnInit {

  public amountOfBeerInLiters: number | null;
  public targetCarbonationLevel: number | null;
  public beerTemperature: number | null;
  public sugarType: string | null;
  public amountOfSugarToRefermentation: number | null;

  public residualCarbonationLevel: number | null;
  public primingCarbonationLevel: number | null;


  constructor() {
    this.amountOfBeerInLiters = null;
    this.targetCarbonationLevel = null;
    this.beerTemperature = null;
    this.sugarType = '';
    this.amountOfSugarToRefermentation = null;

    this.residualCarbonationLevel = null;
    this.primingCarbonationLevel = null;
  }

  ngOnInit(): void {
  }

  calculateResidualCarbonationLevel() {
    //CO2 In Beer = 3.0378 - (0.050062 * temp) + (0.00026555 * temp^2)
    //conversion from Celsius to Farenheit: F = 1.8 * C + 32
    if (this.beerTemperature != null)
      this.residualCarbonationLevel = 3.0378 - (0.050062 * (this.beerTemperature * 1.8 + 32)) + (0.00026555 * (this.beerTemperature * 1.8 + 32) * (this.beerTemperature * 1.8 + 32));
  }

  calculatePrimingCarbonationLevel() {
    if (this.targetCarbonationLevel != null && this.residualCarbonationLevel != null)
      this.primingCarbonationLevel = this.targetCarbonationLevel - this.residualCarbonationLevel;
  }

  calculateAmoutOfSugarToRefermenation() {
    this.calculateResidualCarbonationLevel();
    this.calculatePrimingCarbonationLevel();

    if (this.primingCarbonationLevel != null && this.amountOfBeerInLiters != null && this.targetCarbonationLevel != null &&
        this.beerTemperature != null && this.sugarType != null) {
      switch(this.sugarType) {
        case "whiteSugar":
          this.amountOfSugarToRefermentation = (this.primingCarbonationLevel * this.amountOfBeerInLiters) / 0.455;
          break;

        case "brownSugar":
          break;

        case "glucose":
          break;

        default:
          break;
      }
    } else this.amountOfSugarToRefermentation = 0;

  }

  public beerStylesCarbonationInfo: beerStyleCarbonationInfo[] = [
    {
      name: 'American Pale Ale',
      minCarbonation: 2.3,
      maxCarbonation: 2.8,
    },
    {
      name: 'Belgian Tripel',
      minCarbonation: 2.4,
      maxCarbonation: 3.0,
    },
    {
      name: 'Dry Stout',
      minCarbonation: 1.8,
      maxCarbonation: 2.5,
    },
    {
      name: 'Saison',
      minCarbonation: 2.3,
      maxCarbonation: 2.9,
    },
    {
      name: 'Weizen',
      minCarbonation: 2.5,
      maxCarbonation: 2.9,
    },
    {
      name: 'Fruit Lambic',
      minCarbonation: 2.4,
      maxCarbonation: 3.1,
    },
  ];
}
